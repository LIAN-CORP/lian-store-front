export default function useDeleteTransaction() {
  const loading = ref(false);
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function onDeleteTransaction(id: string) {
    const {
      error,
      execute,
      loading: load,
    } = useApiFetch(`transaction/${id}`, {
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
    loading,
    onDeleteTransaction,
  };
}
