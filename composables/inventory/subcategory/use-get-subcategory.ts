import type { ErrorResponse } from "~/interfaces/error.response";
import type { GetListSubcategories } from "~/interfaces/inventory/subcategory/response/get.list.subcategories";
import type { GetSubcategory } from "~/interfaces/inventory/subcategory/response/get.subcategory";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetSubcategory() {
  const token = useCookie("access_token");

  const subcategories = ref();
  const loading = ref(false);
  const { errorToast } = useCreateToast();
  const { getErrorTranslate } = useHandleResponse();

  async function fetch(id: string) {
    loading.value = true;
    try {
      const url = useGetApiUrl(`subcategory/parent/${id}`);
      const data = await $fetch<paginatedResponse<GetListSubcategories>>(url, {
        query: {
          page: 0,
          size: 100,
          isAsc: true,
        },
        headers: {
          Authorization: token.value ? `Bearer ${token.value}` : "",
        },
      });
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
      const error = result.error.value.data as ErrorResponse;
      const msg = getErrorTranslate(error.type);
      errorToast(msg);
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
