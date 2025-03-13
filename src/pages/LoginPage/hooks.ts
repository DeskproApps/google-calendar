import { ACCESS_TOKEN_PATH, REFRESH_TOKEN_PATH } from "../../constants";
import { createSearchParams, useNavigate } from "react-router-dom";
import { getAccessTokenService, getCalendarsService } from "../../services/google";
import { IOAuth2, OAuth2Result, useDeskproAppClient, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { useCallback, useEffect, useState } from "react";
import type { Settings, TicketData } from "../../types";

type UseLogin = () => {
  onSignIn: () => void,
  authUrl: string | null,
  error: null | string,
  isLoading: boolean,
};

const useLogin: UseLogin = () => {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false)
  const [isPolling, setIsPolling] = useState(false)
  const [oauth2, setOauth2] = useState<IOAuth2 | null>(null)

  const navigate = useNavigate();

  const { context } = useDeskproLatestAppContext<TicketData, Settings>();
  const { client } = useDeskproAppClient()

  const ticketId = context?.data?.ticket.id

  useInitialisedDeskproAppClient(async (client) => {
    if (context?.settings.use_deskpro_saas === undefined || !ticketId) {
      // Make sure settings have loaded.
      return
    }

    const clientId = context?.settings.client_id;
    const mode = context?.settings.use_deskpro_saas ? 'global' : 'local';

    if (mode === 'local' && typeof clientId !== 'string') {
      // Local mode requires a clientId.
      return
    }

    // Start OAuth process depending on the authentication mode
    const oauth2Temp =
      mode === 'local'
        // Local Version (custom/self-hosted app)
        ? await client.startOauth2Local(
          ({ state, callbackUrl }) => {
            return `https://accounts.google.com/o/oauth2/auth?${createSearchParams([
              ["response_type", "code"],
              ["client_id", clientId ?? ""],
              ["state", state],
              ["redirect_uri", callbackUrl],
              ["scope", [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/calendar"
              ].join(" ")]
            ])}`
          },
          /\bcode=(?<code>[^&#]+)/,
          async (code: string): Promise<OAuth2Result> => {
            // Extract the callback URL from the authorization URL
            const url = new URL(oauth2Temp.authorizationUrl);
            const redirectUri = url.searchParams.get("redirect_uri");

            if (!redirectUri) {
              throw new Error("Failed to get callback URL");
            }

            const data = await getAccessTokenService(client, code, redirectUri);

            return { data }
          }
        )

        // Global Proxy Service
        : await client.startOauth2Global("420430645319-ig0pvlaoaute8dmg07nj2hsc2vrb8vsn.apps.googleusercontent.com");

    setAuthUrl(oauth2Temp.authorizationUrl)
    setOauth2(oauth2Temp)
  }, [setAuthUrl, context?.settings.client_id, context?.settings.use_deskpro_saas])

  useEffect(() => {
    if (!client || !ticketId || !oauth2) {
      return
    }

    const startPolling = async () => {
      try {
        const result = await oauth2.poll()
        await Promise.all([
          client.setUserState(ACCESS_TOKEN_PATH, result.data.access_token, { backend: true }),
          result.data.refresh_token ? client.setUserState(REFRESH_TOKEN_PATH, result.data.refresh_token, { backend: true }) : Promise.resolve(undefined)
        ])

        // Attempt to get the user's calendars to verify that they are authenticated
        // This function will throw an error if the user isn't properly authenticated
        // Then we display a user friendly message
        try {
          await getCalendarsService(client)
        } catch (e) {
          throw new Error("Error authenticating user")
        }

        navigate("/home")
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setIsLoading(false)
        setIsPolling(false)
      }
    }

    if (isPolling) {
      startPolling()
    }
  }, [isPolling, client, ticketId, oauth2, navigate])

  const onSignIn = useCallback(() => {
    setIsLoading(true);
    setIsPolling(true);
    window.open(authUrl ?? "", '_blank');
  }, [setIsLoading, authUrl]);


  return { authUrl, onSignIn, error, isLoading }
};

export { useLogin };
