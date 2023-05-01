/** Date */
export const DATE_FORMAT = "dd MMM, yyyy";

export const TIME_FORMAT = "H:mm";

export const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;

/** Deskpro */
export const APP_PREFIX = "google_calendar";

export const ACCESS_TOKEN_PATH = `${APP_PREFIX}/oauth/global/access_token`;
export const ACCESS_TOKEN = `[user[${ACCESS_TOKEN_PATH}]]`;

export const placeholders = {
  client_id: "__client_id__",
  client_secret: "__client_secret__",
};

/** Google */
export const BASE_URL = "https://www.googleapis.com/calendar/v3";
