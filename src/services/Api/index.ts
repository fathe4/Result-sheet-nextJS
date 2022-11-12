// import Config from "../../common/Config";
import axios, {
  Method,
  AxiosResponse,
  AxiosError,
  AxiosRequestHeaders,
} from "axios";
import Results from "./results";
import Tables from "./tables";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

class Api {
  results: Record<string, Function>;
  tables: Record<string, Function>;

  constructor() {
    this.results = Results(this);
    this.tables = Tables(this);
  }

  post(
    url: string,
    params: unknown,
    data: unknown,
    headers?: AxiosRequestHeaders
  ) {
    return this.send(url, "POST", params, data, headers);
  }

  put(
    url: string,
    params: unknown,
    data: unknown,
    headers?: AxiosRequestHeaders
  ) {
    return this.send(url, "PUT", params, data, headers);
  }

  get(
    url: string,
    params: unknown,
    data: unknown,
    headers?: AxiosRequestHeaders
  ) {
    return this.send(url, "GET", params, data, headers);
  }

  delete(
    url: string,
    params: unknown,
    data: unknown,
    headers?: AxiosRequestHeaders
  ) {
    return this.send(url, "DELETE", params, data, headers);
  }

  patch(
    url: string,
    params: unknown,
    data: unknown,
    headers?: AxiosRequestHeaders
  ) {
    return this.send(url, "PATCH", params, data, headers);
  }

  send(
    url: string,
    method: Method,
    params: unknown,
    data: unknown,
    headers?: AxiosRequestHeaders
  ) {
    // const isClient = typeof window !== "undefined";
    // const defaultHeaders = {
    //   moquiSessionToken:
    //     (isClient && localStorage.getItem("moquiSessionToken")) || "",
    // };
    return new Promise((resolve, reject) => {
      api({
        url,
        method,
        params,
        headers: { ...headers },
        data,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => reject(error));
    });
  }
}

export default new Api();
