import api from "../catalog/api";

export type Response<T> = {
  status: number;
  data: T;
};
export interface HttpClient {
  get<T>(url: string): Promise<Response<T>>;
  post<T>(url: string, body: any): Promise<Response<T>>;
}

export class HonoClientAdapter implements HttpClient {
  async get<T>(url: string): Promise<Response<T>> {
    const response = await api.request(url);
    const data = (await response.json()) as T;

    return {
      status: 200,
      data,
    };
  }

  async post<T>(url: string, body: any): Promise<Response<T>> {
    console.log({ url, body });

    return {
      status: 201,
      data: {} as T,
    };
  }
}
