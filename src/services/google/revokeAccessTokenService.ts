import { baseRequest } from "./baseRequest";
import { ACCESS_TOKEN } from "../../constants";
import type { IDeskproClient } from "@deskpro/app-sdk";

const revokeAccessTokenService = (client: IDeskproClient) => {
  return baseRequest(client, {
    rawUrl: "https://oauth2.googleapis.com/revoke",
    method: "POST",
    queryParams: `?token=${ACCESS_TOKEN}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export { revokeAccessTokenService };
