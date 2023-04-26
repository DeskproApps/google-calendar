export type InitData = {
  status: number,
  data: {
    code: number,
    message: string,
  },
};

class GoogleAPIError extends Error {
  status: number;
  data: {
    code: number,
    message: string,
  };

  constructor({ status, data }: InitData) {
    const message = "Google Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { GoogleAPIError };
