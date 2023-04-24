import type { To } from "react-router-dom";

/** Deskpro types */
export type NavigateToChangePage = { type: "changePage", path: To };

export type EventPayload =
  | NavigateToChangePage
  | { type: "logout" }
;
