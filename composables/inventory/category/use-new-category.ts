import type { ErrorResponse } from "~/interfaces/error.response";
import type { NewCategoryRequest } from "~/interfaces/inventory/category/request/new.category.request";
import type { NewCategoryResponse } from "~/interfaces/inventory/category/response/new.category.response";

export default function useNewCategory() {
  const { errorToast, successToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function createCategory(category: NewCategoryRequest) {
    const url = useGetApiUrl("category");
    try {
      await $fetch<NewCategoryResponse>(url, {
        method: "POST",
        body: category,
      });
      const msg = getSuccessTranslate("response.success.new_category");
      successToast(msg);
    } catch (e: any) {
      const error = e.data as ErrorResponse;
      const msg = getErrorTranslate(error.type);
      errorToast(msg);
    }
  }
  return {
    createCategory,
  };
}
