import type { GetListSubcategories } from "~/interfaces/inventory/subcategory/response/get.list.subcategories";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetSubcategory() {
  const subcategories = ref();
  const loading = ref(false);

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
  return {
    subcategories,
    loading,
    refresh: fetch,
  };
}
