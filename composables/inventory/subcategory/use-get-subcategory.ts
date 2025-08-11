import type { GetListSubcategories } from "~/interfaces/inventory/subcategory/response/get.list.subcategories";
import type { GetSubcategory } from "~/interfaces/inventory/subcategory/response/get.subcategory";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetSubcategory() {
  const subcategories = ref();
  const loading = ref(false);
  const { errorToast } = useCreateToast();

  async function fetch(id: string) {
    loading.value = true;
    try {
      const url = useGetApiUrl(`subcategory/parent/${id}`);
      const data = await $fetch<paginatedResponse<GetListSubcategories>>(url);
      subcategories.value = data?.content ?? [];
    } catch (e: any) {
      subcategories.value = [];
    } finally {
      loading.value = false;
    }
  }

  async function getSubcategoryById(subcategoryId: string) {
    const url = useGetApiUrl(`subcategory/${subcategoryId}`);
    const result = await useFetch<GetSubcategory>(url);
    if (result.error.value) {
      errorToast("error inesperado");
    }
    return result;
  }

  return {
    subcategories,
    loading,
    refresh: fetch,
    getSubcategoryById,
  };
}
