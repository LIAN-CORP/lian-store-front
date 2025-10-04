import type { UpdateProductRequest } from "~/interfaces/inventory/product/request/update.product.request";

export default function useUpdateProduct() {
  const loading = ref<boolean>(false);
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();

  async function update(updatedProduct: UpdateProductRequest) {
    const {
      loading: load,
      error,
      execute,
    } = useApiFetch("product", {
      method: "PUT",
      body: updatedProduct,
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
    const msg = getSuccessTranslate("response.success.update_product");
    infoToast(msg);
  }
  return {
    update,
    loading,
  };
}
