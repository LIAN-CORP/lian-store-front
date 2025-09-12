import type { ErrorResponse } from "~/interfaces/error.response";

export default function useDeleteSubcategory() {
  const loading = ref<boolean>(false);
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  const { errorToast, infoToast } = useCreateToast();
  async function deleteSubcategory(subcategoryId: string) {
    const url = useGetApiUrl(`subcategory/${subcategoryId}`, "stockApi");
    let msg: string;
    try {
      loading.value = true;
      await $fetch(url, {
        method: "DELETE",
      });
      msg = getSuccessTranslate("response.success.delete_subcategory");
      infoToast(msg);
    } catch (e: any) {
      const error = e as ErrorResponse;
      msg = getErrorTranslate(error.type);
      errorToast(msg);
    } finally {
      loading.value = false;
    }
  }
  return {
    deleteSubcategory,
    loading,
  };
}
