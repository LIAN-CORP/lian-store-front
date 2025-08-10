import type { ErrorResponse } from "~/interfaces/error.response";
import type { GetCategory } from "~/interfaces/inventory/category/response/get.category";
import type { GetListCategories } from "~/interfaces/inventory/category/response/get.list.categories";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetCategory() {
  const url = useGetApiUrl("category");
  const { errorToast } = useCreateToast();

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

  async function fetchCategoryById(id: string) {
    const url = useGetApiUrl(`category/${id}`);
    const result = await useFetch<GetCategory>(url);
    if (result.error.value) {
      errorToast("error inesperado");
    }
    return result;
  }

  return {
    categories,
    error,
    status,
    categoryRefresh: refresh,
    fetchCategoryById,
  };
}
