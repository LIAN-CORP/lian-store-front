import type { ErrorResponse } from "~/interfaces/error.response";
import type { NewSubcategoryResponse } from "~/interfaces/inventory/subcategory/response/new.subcategory.response";
import type { NewSubcategoryRequest } from "~/interfaces/inventory/subcategory/request/new.subcategory.request";

export default function useNewSubcategory() {
  const loading = ref<boolean>(false);
  const { errorToast, successToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();

  async function createSubcategory(subcategory: NewSubcategoryRequest) {
    const url = useGetApiUrl("subcategory", "stockApi");
    let msg = "";
    try {
      loading.value = true;
      await $fetch<NewSubcategoryResponse>(url, {
        method: "POST",
        body: subcategory,
      });
      msg = getSuccessTranslate("response.success.new_subcategory");
      successToast(msg);
    } catch (e: any) {
      const error = e.data as ErrorResponse;
      msg = getErrorTranslate(error.type);
      errorToast(msg);
    } finally {
      loading.value = false;
    }
  }
  return { createSubcategory, loading };
}
