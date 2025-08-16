import type { ErrorResponse } from "~/interfaces/error.response";

export default function useDeleteSubcategory() {
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  const { errorToast, infoToast } = useCreateToast();
  async function deleteSubcategory(subcategoryId: string) {
    const url = useGetApiUrl(`subcategory/${subcategoryId}`);
    let msg: string;
    try {
      await $fetch(url, {
        method: "DELETE",
      });
      msg = getSuccessTranslate("response.success.delete_subcategory");
      infoToast(msg);
    } catch (e: any) {
      const error = e as ErrorResponse;
      msg = getErrorTranslate(error.type);
      errorToast(msg);
    }
  }
  return {
    deleteSubcategory,
  };
}
