import type { GetListProducts } from "~/interfaces/inventory/response/get.list.products.";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export const useProduct = () => {
  const url = useRuntimeConfig().public.apiBase;
  return useFetch<paginatedResponse<GetListProducts>>(`${url}/product`, {
    query: {
      page: 0,
      size: 10,
      isAsc: true,
      sortBy: "name",
    },
  });
};
