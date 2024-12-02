/* eslint-disable @typescript-eslint/no-explicit-any */
class FetchWrapperError extends Error {
  constructor(message: string, response: any) {
    super(message);
    this.response = response;
  }

  response: any;
}

export const fetchWrapper = async (
  url: string,
  options: {
    httpOptions: RequestInit;
    routingGenerateOptions?: {
      [key: string]: any;
    };
  }
) => {
  if (!url) {
    throw new Error('Invalid route');
  }
  const response = await fetch(url, options.httpOptions);
  // check if valid json
  if (!response.ok) {
    const responseJson: any = await response.json();
    const error = new FetchWrapperError(response.statusText, responseJson);
    throw error;
  }
  return response;
};
