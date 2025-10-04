export default function useDeleteSubcategory() {
  const loading = ref<boolean>(false);
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  const { errorToast, infoToast } = useCreateToast();
  async function deleteSubcategory(subcategoryId: string) {
    const {
      error,
      execute,
      loading: load,
    } = useApiFetch(`subcategory/${subcategoryId}`, {
      method: "DELETE",
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
    const msg = getSuccessTranslate("response.success.delete_subcategory");
    infoToast(msg);
  }
  return {
    deleteSubcategory,
    loading,
  };
}
