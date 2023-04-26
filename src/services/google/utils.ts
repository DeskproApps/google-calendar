import has from "lodash/has";
import type { OAuthToken, GoogleRestError } from "./types";

const isAccessToken = (
  payload: OAuthToken|GoogleRestError
): payload is OAuthToken => {
  return has(payload, ["access_token"]);
};

export { isAccessToken };
