export default function useDeleteCategory() {
  const loading = ref<boolean>(false);
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function deleteCategory(categoryId: string) {
    const {
      error,
      execute,
      loading: load,
    } = useApiFetch(`category/${categoryId}`, {
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
    const msg = getSuccessTranslate("response.success.delete_category");

    infoToast(msg);
  }
  return {
    deleteCategory,
    loading,
  };
}
