export default function useDeleteProduct() {
  const loading = ref<boolean>(false);
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function deleteProduct(id: string) {
    const {
      error,
      execute,
      loading: load,
    } = useApiFetch(`product/${id}`, {
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
    const msg = getSuccessTranslate("response.success.delete_product");
    infoToast(msg);
  }
  return {
    deleteProduct,
    loading,
  };
}
