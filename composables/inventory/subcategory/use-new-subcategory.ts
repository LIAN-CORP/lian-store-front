import type { NewSubcategoryResponse } from "~/interfaces/inventory/subcategory/response/new.subcategory.response";
import type { NewSubcategoryRequest } from "~/interfaces/inventory/subcategory/request/new.subcategory.request";

export default function useNewSubcategory() {
  const loading = ref<boolean>(false);
  const { errorToast, successToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();

  async function createSubcategory(subcategory: NewSubcategoryRequest) {
    const {
      loading: load,
      error,
      execute,
    } = useApiFetch<NewSubcategoryResponse>("subcategory", {
      method: "POST",
      body: subcategory,
    });
    watch(load, (val) => {
      loading.value = val;
    });
    await execute();
    if (error.value) {
      const msg = getErrorTranslate(error.value.type);
      errorToast(msg);
      return;
    }
    const msg = getSuccessTranslate("response.success.new_subcategory");
    successToast(msg);
  }
  return { createSubcategory, loading };
}
