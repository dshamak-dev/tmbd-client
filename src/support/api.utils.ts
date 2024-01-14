export const apiConfig = {
  API_URL: process.env.API_URL || "/",
  API_SECRET: process.env.API_SECRET,
  API_ACCESS_TOKEN: process.env.API_ACCESS_TOKEN,
  PUBLIC_URL: process.env.PUBLIC_URL || '/'
};

export const normalizeURL = (host, path: string) => {
  const _host = host?.replace(/\/$/, "");
  const address = path.replace(/^\//, "");

  return `${_host}/${address}`;
};

export const normalizeAPIURL = (path: string) => {
  const host = apiConfig.API_URL?.replace(/\/$/, "");
  const address = path.replace(/^\//, "");

  return normalizeURL(apiConfig.API_URL, path);
};

const normalizeHeaders = (headers) => {
  return Object.assign(
    {
      Authorization: `Bearer ${apiConfig.API_ACCESS_TOKEN}`,
    },
    headers
  );
};

const normalizeRequestProps = (props) => {
  const { headers, ...other } = props || {};

  return Object.assign(
    {
      headers: normalizeHeaders(headers),
    },
    other
  );
};

export const waitForMs = (ms: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

const validateResponseStatus = async (response: Response) => {
  if (!response) {
    throw new Error("invalid response");
  }

  if (response.status >= 400) {
    throw new Error("invalid request");
  }

  return response;
};

export const GET = (path: string, options?: any) => {
  return fetch(normalizeAPIURL(path), normalizeRequestProps(options)).then((res) =>
    validateResponseStatus(res)
  );
};

