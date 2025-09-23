import type { UpdateSubcategoryRequest } from "~/interfaces/inventory/subcategory/request/update.subcategory.resquest";

export default function useUpdateSubcategory() {
  const loading = ref<boolean>(false);
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function updateSubcategory(subcategory: UpdateSubcategoryRequest) {
    const {
      loading: load,
      error,
      execute,
    } = useApiFetch("subcategory", {
      method: "PUT",
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
    const msg = getSuccessTranslate("response.success.update_subcategory");
    infoToast(msg);
  }
  return {
    updateSubcategory,
    loading,
  };
}
