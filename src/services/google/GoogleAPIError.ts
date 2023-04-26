import type { GoogleRestError } from "./types";

export type InitData = {
  status: number,
  data: GoogleRestError,
};

class GoogleAPIError extends Error {
  status: number;
  data: GoogleRestError;

  constructor({ status, data }: InitData) {
    const message = "Google Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { GoogleAPIError };
