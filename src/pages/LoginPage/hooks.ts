import { useState, useEffect, useMemo, useCallback } from "react";
import { createSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import get from "lodash/get";
import has from "lodash/has";
import {
  useDeskproAppClient,
  useDeskproLatestAppContext,
} from "@deskpro/app-sdk";
import { useAsyncError } from "../../hooks";
import { setAccessTokenService } from "../../services/deskpro";
import {
  isAccessToken,
  getCalendarsService,
  getAccessTokenService,
} from "../../services/google";
import type { OAuth2StaticCallbackUrl } from "@deskpro/app-sdk";
import type { TicketContext } from "../../types";

const defaultLoginError = "An error occurred, please try again.";

type UseLogin = () => {
  isAuth: boolean;
  authLink: string;
  isLoading: boolean;
  onSignIn: () => void;
};

const useLogin: UseLogin = () => {
  const key = useMemo(() => uuidv4(), []);
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: TicketContext };
  const { asyncErrorHandler } = useAsyncError();

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [authLink, setAuthLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [callback, setCallback] = useState<
    OAuth2StaticCallbackUrl | undefined
  >();
  const clientId = get(context, ["settings", "client_id"]);
  const callbackUrl = get(callback, ["callbackUrl"]);

  const onSignIn = useCallback(() => {
    if (!client || !callback?.poll || !callback.callbackUrl) {
      return;
    }

    setTimeout(() => setIsLoading(true), 1000);

    callback.poll()
      .then(({ token }) => {
        return getAccessTokenService(client, token, callback.callbackUrl);
      })
      .then((data) => {
        return isAccessToken(data)
          ? setAccessTokenService(client, data)
          : Promise.reject(defaultLoginError)
      })
      .then(({ isSuccess, errors }) => {
        return isSuccess ? Promise.resolve() : Promise.reject(errors)
      })
      .then(() => getCalendarsService(client))
      .then((calendars) => {
        if (!has(calendars, ["items"])) {
          throw new Error("Can't find calendars");
        } else {
          setIsAuth(true);
        }
      })
      .catch(asyncErrorHandler)
      .finally(() => setIsLoading(false));
  }, [callback, client, setIsLoading, asyncErrorHandler]);

  /** set callback */
  useEffect(() => {
    if (!callback && client) {
      client
        .oauth2()
        .getGenericCallbackUrl(
          key,
          /code=(?<token>[\d\w%-]+)/,
          /state=(?<key>[\d\w-]+)/
        )
        .then(setCallback);
    }
  }, [client, key, callback]);

  /** set authLink */
  useEffect(() => {
    if (key && callbackUrl && clientId) {
      setAuthLink(
        `https://accounts.google.com/o/oauth2/auth?${createSearchParams([
          ["state", key],
          ["response_type", "code"],
          ["client_id", clientId],
          ["redirect_uri", callbackUrl],
          ["scope", [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/calendar"
          ].join(" ")]
        ])}`
      );
      setIsLoading(false);
    } else {
      setAuthLink("");
      setIsLoading(true);
    }
  }, [key, callbackUrl, clientId]);

  return { isAuth, authLink, onSignIn, isLoading };
};

export { useLogin };
