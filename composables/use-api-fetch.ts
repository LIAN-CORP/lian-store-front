import type { ErrorResponse } from "~/interfaces/error.response";

interface ApiResult<T> {
  data: Ref<T | null | undefined>;
  loading: Ref<boolean>;
  error: Ref<ErrorResponse | null>;
  execute: () => Promise<void>;
}

interface ApiFetchOptions {
  query?: Record<string, any>;
  body?: any;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
}

export function useApiFetch<T>(
  endpoint: string,
  options?: ApiFetchOptions
): ApiResult<T> {
  const token = useCookie("access_token");
  const url = useGetApiUrl(endpoint);

  const data = ref<T | null>();
  const loading = ref(false);
  const error = ref<ErrorResponse | null>(null);

  const execute = async () => {
    loading.value = true;
    try {
      data.value = await $fetch<T>(url, {
        method: options?.method ?? "GET",
        query: options?.query,
        body: options?.body,
        headers: {
          Authorization: `Bearer ${token.value}`,
          ...options?.headers,
        },
      });
      error.value = null;
    } catch (e: any) {
      const err = e as ErrorResponse;
      error.value = err;
      if (err.code === 401) {
        token.value = null;
      }
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, execute };
}
