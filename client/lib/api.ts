import api from "./axios";

type Method = "get" | "post" | "put" | "patch" | "delete";

interface ApiHandlerOptions<TBody = unknown> {
  url: string;
  method?: Method;
  data?: TBody;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const apiHandler = async <
  TResponse = {
    data: unknown;
    errors: unknown;
    path: string;
    success: boolean;
    timestamp: Date;
  },
  TBody = unknown
>(
  options: ApiHandlerOptions<TBody>
): Promise<TResponse> => {
  try {
    const { url, method = "get", data, params, headers } = options;
    const res = await api.request<TResponse>({
      url,
      method,
      data,
      params,
      headers,
    });
    return res.data;
  } catch (err) {
    return err as TResponse;
  }
};
