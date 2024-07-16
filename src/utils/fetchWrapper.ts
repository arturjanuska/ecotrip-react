class FetchWrapperError extends Error {
  constructor(message: string, response: any) {
    super(message);
    this.response = response;
  }

  response: any;
}

export const fetchWrapper = async (
  route: string,
  options: {
    httpOptions: RequestInit;
    routingGenerateOptions?: {
      [key: string]: any;
    };
  }
) => {
  // if (!window.Routing)
  //   throw new Error(
  //     "Routing is not defined. Did you forget to import routing.js?"
  //   );
  // const url = window.Routing.generate(
  //   generateRoute,
  //   options.routingGenerateOptions
  // );
  // if (!url) {
  //   throw new Error("Invalid route");
  // }
  const response = await fetch(
    `http://localhost:3000/api/${route}`,
    options.httpOptions
  );
  // check if valid json
  if (!response.ok) {
    const responseJson: any = await response.json();
    const error = new FetchWrapperError(response.statusText, responseJson);
    throw error;
  }
  return response;
};
