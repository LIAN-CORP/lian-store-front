import type { ErrorResponse } from "~/interfaces/error.response";
import type { GetCategory } from "~/interfaces/inventory/category/response/get.category";
import type { GetListCategories } from "~/interfaces/inventory/category/response/get.list.categories";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetCategory() {
  const url = useGetApiUrl("category", "stockApi");
  const { errorToast } = useCreateToast();
  const { getErrorTranslate } = useHandleResponse();

  const { data, error, refresh, status } = useFetch<
    paginatedResponse<GetListCategories>
  >(url, {
    query: {
      page: 0,
      size: 100,
      isAsc: true,
    },
    lazy: true,
  });
  const categories = computed(() => data.value?.content ?? []);

  async function fetchCategoryById(id: string) {
    const url = useGetApiUrl(`category/${id}`, "stockApi");
    const result = await useFetch<GetCategory>(url);
    if (result.error.value) {
      const error = result.error.value.data as ErrorResponse;
      const msg = getErrorTranslate(error.type);
      errorToast(msg);
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
