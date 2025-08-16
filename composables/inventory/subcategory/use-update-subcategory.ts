import type { ErrorResponse } from "~/interfaces/error.response";
import type { UpdateSubcategoryRequest } from "~/interfaces/inventory/subcategory/request/update.subcategory.resquest";

export default function useUpdateSubcategory() {
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function updateSubcategory(subcategory: UpdateSubcategoryRequest) {
    let msg: string;
    try {
      const url = useGetApiUrl("subcategory");
      await $fetch(url, {
        method: "PUT",
        body: subcategory,
      });
      msg = getSuccessTranslate("response.success.update_subcategory");
      infoToast(msg);
    } catch (e: any) {
      const error = e as ErrorResponse;
      msg = getErrorTranslate(error.type);
      errorToast(msg);
    }
  }
  return {
    updateSubcategory,
  };
}
