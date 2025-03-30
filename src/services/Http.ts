import axios, { AxiosRequestConfig } from "axios";

export const backendBaseUrl = "http://localhost:8000";
export const backendUrl = "http://localhost:8000/api";

export default class Http {

  private constructor() {}
  
  public static Init() {
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
  }

  public static Get<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return new Promise<T>(async (resolve) => {
      try {
        const result = await axios.get<T>(url, config);
        resolve(result.data);
      } catch(_) {
      }
    });
  }

  public static Post<T = void>(url: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
    return new Promise<T>(async (resolve) => {
      try {
        axios.post<T>(url, body ?? {}, config)
        .then(result => {
          resolve(result.data);
        })
        .catch(err => {
          
        });
      } catch(_) {
      }
    });
  }
}