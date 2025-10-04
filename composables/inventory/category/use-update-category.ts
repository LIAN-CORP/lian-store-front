import type { UpdateCategory } from "~/interfaces/inventory/category/request/update.category.request";

export default function useUpdateCategory() {
  const loading = ref<boolean>(false);
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function updateCategory(category: UpdateCategory) {
    const {
      loading: load,
      error,
      execute,
    } = useApiFetch("category", {
      method: "PUT",
      body: category,
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
    const msg = getSuccessTranslate("response.success.update_category");
    infoToast(msg);
  }
  return {
    updateCategory,
    loading,
  };
}
