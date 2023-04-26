import { baseRequest } from "./baseRequest";
import { placeholders } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { OAuthToken } from "./types";

const getAccessTokenService = (
  client: IDeskproClient,
  accessCode: string,
  callbackUrl: string
) => {
  return baseRequest<OAuthToken>(client, {
    rawUrl: "https://oauth2.googleapis.com/token",
    method: "POST",
    queryParams: {
      grant_type: "authorization_code",
      client_id: placeholders.client_id,
      client_secret: placeholders.client_secret,
      code: accessCode,
      redirect_uri: callbackUrl,
    },
  });
};

export { getAccessTokenService };
