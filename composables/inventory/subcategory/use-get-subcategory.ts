import type { GetListSubcategories } from "~/interfaces/inventory/subcategory/response/get.list.subcategories";
import type { GetSubcategory } from "~/interfaces/inventory/subcategory/response/get.subcategory";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetSubcategory() {
  const subcategories = ref<paginatedResponse<GetListSubcategories> | null>(
    null
  );
  const loading = ref(false);
  const { errorToast } = useCreateToast();
  const { getErrorTranslate } = useHandleResponse();

  async function fetch(id: string) {
    const { data, execute } = useApiFetch<
      paginatedResponse<GetListSubcategories>
    >(`subcategory/parent/${id}`, {
      query: {
        page: 0,
        size: 100,
        isAsc: true,
      },
    });
    await execute();
    subcategories.value = data.value ?? null;
  }

  async function getSubcategoryById(subcategoryId: string) {
    const { data, execute, error } = useApiFetch<GetSubcategory>(
      `subcategory/${subcategoryId}`
    );
    await execute();
    if (error.value) {
      const msg = getErrorTranslate(error.value.type);
      errorToast(msg);
    }
    return { data };
  }

  return {
    subcategories,
    loading,
    refresh: fetch,
    getSubcategoryById,
  };
}
