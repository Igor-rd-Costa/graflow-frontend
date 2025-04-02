import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const backendBaseUrl = "http://localhost:8000";
export const backendUrl = "http://localhost:8000/api";


export class HttpRequest<T> {

  private readonly result: T|null;
  private readonly status: number;

  public constructor(result: T|null, status: number) {
    this.result = result;
    this.status = status;
  }

  public Success(): boolean {
    return (this.status > 199 && this.status < 300);
  }

  public Result(): T|null {
    return this.result;
  }

  public Status(): number {
    return this.status;
  }
}


export default class Http {

  private constructor() {}
  
  public static Init() {
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
  }

  public static Get<T = void>(url: string, config?: AxiosRequestConfig): Promise<HttpRequest<T|null>> {
    return new Promise<HttpRequest<T|null>>(async (resolve) => {
      try {
        const result = await axios.get<T>(url, config);
        resolve(new HttpRequest(result.data, result.status));
      } catch(err) {
        const e = err as AxiosError;
        resolve(new HttpRequest(null, e.status ?? 400));
      }
    });
  }

  public static Post<T = void>(url: string, body?: any, config?: AxiosRequestConfig): Promise<HttpRequest<T|null>> {
    return new Promise<HttpRequest<T|null>>(async (resolve) => {
      try {
        axios.post<T>(url, body ?? {}, config)
        .then(result => {
          resolve(new HttpRequest(result.data, result.status));
        })
        .catch(err => {
          resolve(new HttpRequest(null, 400));
        });
      } catch(_) {
      }
    });
  }
}