import type { NewCategoryRequest } from "~/interfaces/inventory/category/request/new.category.request";
import type { NewCategoryResponse } from "~/interfaces/inventory/category/response/new.category.response";

export default function useNewCategory() {
  const loading = ref<boolean>(false);
  const { errorToast, successToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function createCategory(category: NewCategoryRequest) {
    const {
      loading: load,
      error,
      execute,
    } = useApiFetch<NewCategoryResponse>("category", {
      method: "POST",
      body: category,
    });
    await execute();
    loading.value = load.value;
    if (error.value) {
      const msg = getErrorTranslate(error.value.type);
      errorToast(msg);
      return;
    }
    const msg = getSuccessTranslate("response.success.new_category");
    successToast(msg);
  }
  return {
    createCategory,
    loading,
  };
}
