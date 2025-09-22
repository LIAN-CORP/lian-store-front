import type { GetCategory } from "~/interfaces/inventory/category/response/get.category";
import type { GetListCategories } from "~/interfaces/inventory/category/response/get.list.categories";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetCategory() {
  const { errorToast } = useCreateToast();
  const { getErrorTranslate } = useHandleResponse();
  const categories = ref<paginatedResponse<GetListCategories> | null>(null);
  async function fetchAllCategories() {
    const { data, execute } = useApiFetch<paginatedResponse<GetListCategories>>(
      "category",
      {
        query: {
          page: 0,
          size: 100,
          isAsc: true,
        },
      }
    );
    await execute();
    categories.value = data.value ?? null;
  }

  async function fetchCategoryById(id: string) {
    const { data, execute, error } = useApiFetch<GetCategory>(`category/${id}`);
    await execute();
    if (error.value) {
      const msg = getErrorTranslate(error.value.type);
      errorToast(msg);
    }
    return { data };
  }

  return {
    categories,
    fetchAllCategories,
    fetchCategoryById,
  };
}
