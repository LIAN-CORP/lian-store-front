import type { ErrorResponse } from "~/interfaces/error.response";
import type { UpdateCategory } from "~/interfaces/inventory/category/request/update.category.request";

export default function useUpdateCategory() {
  const loading = ref<boolean>(false);
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function updateCategory(category: UpdateCategory) {
    let msg: string = "";
    try {
      loading.value = true;
      const url = useGetApiUrl("category", "stockApi");
      const result = await $fetch.raw(url, {
        method: "PUT",
        body: category,
      });
      if (result.status == 200) {
        msg = getSuccessTranslate("response.success.update_category");
        infoToast(msg);
      }
    } catch (e: any) {
      const error = e as ErrorResponse;
      msg = getErrorTranslate(error.type);
      errorToast(msg);
    } finally {
      loading.value = false;
    }
  }
  return {
    updateCategory,
    loading,
  };
}
