import type { GetListCategories } from "~/interfaces/inventory/category/response/get.list.categories";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default async function useGetCategory() {
  const url = useGetApiUrl("category");
  return useFetch<paginatedResponse<GetListCategories>>(url, {
    query: {
      page: 0,
      size: 10,
      isAsc: true,
    },
    lazy: true,
  });
}
