import type { ErrorResponse } from "~/interfaces/error.response";

export default function useDeleteCategory() {
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function deleteCategory(categoryId: string) {
    const url = useGetApiUrl(`category/${categoryId}`);
    let msg: string;
    try {
      await $fetch(url, {
        method: "DELETE",
      });
      msg = getSuccessTranslate("response.success.delete_category");
      infoToast(msg);
    } catch (e: any) {
      const error = e as ErrorResponse;
      msg = getErrorTranslate(error.type);
      errorToast(msg);
    }
  }
  return {
    deleteCategory,
  };
}
