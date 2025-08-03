import type { GetListCategories } from "~/interfaces/inventory/category/response/get.list.categories";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetCategory() {
  const url = useGetApiUrl("category");

  const { data, error, refresh, status } = useFetch<
    paginatedResponse<GetListCategories>
  >(url, {
    query: {
      page: 0,
      size: 10,
      isAsc: true,
    },
    lazy: true,
  });

  const categories = computed(() => data.value?.content ?? []);

  return {
    categories,
    error,
    status,
    categoryRefresh: refresh,
  };
}
