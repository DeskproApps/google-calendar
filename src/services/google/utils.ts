import has from "lodash/has";
import { GoogleAPIError } from "./GoogleAPIError";
import type { OAuthToken, GoogleRestError } from "./types";

const isAccessToken = (
  payload: OAuthToken|GoogleRestError
): payload is OAuthToken => {
  return has(payload, ["access_token"]);
};

const isGoogleRestError = (error: Error|typeof GoogleAPIError): error is GoogleAPIError => {
  return has(error, ["data", "error", "message"]);
};

export { isAccessToken, isGoogleRestError };
