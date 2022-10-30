import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

export enum Methods {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export enum Status {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export interface RequestConfig extends AxiosRequestConfig {
  resource: string;
  method?: Methods;
}

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const authToken = localStorage.getItem("auth-token");
  if (authToken && config.headers) {
    config.headers.Authorization = authToken;
  }

  return config;
});

axios.interceptors.response.use(
  async (response) => response,
  async (error: AxiosError) => {
    toast.error(error.message);
    return Promise.reject(error);
  }
);

export function generateUrl(resource: string = "") {
  return `http://localhost:3001/${resource}`;
}

async function request<T = void>({
  resource,
  method = Methods.GET,
  ...config
}: RequestConfig) {
  const url = generateUrl(resource);

  const requestConfig = {
    method,
    url,
    ...config,
  };

  const { data: response } = await axios.request<T>(requestConfig);

  return response;
}

export default request;
