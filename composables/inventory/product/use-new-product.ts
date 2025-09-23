import type { NewProductRequest } from "~/interfaces/inventory/product/request/new.product.request";

export default function useNewProduct() {
  const loading = ref<boolean>(false);
  const { errorToast, successToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();

  async function createNewProduct(image: File, product: NewProductRequest) {
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(product)], {
      type: "application/json",
    });
    formData.append("image", image);
    formData.append("product", jsonBlob);
    const {
      error,
      execute,
      loading: load,
    } = useApiFetch("product", {
      method: "POST",
      body: formData,
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
    const msg = getSuccessTranslate("response.success.new_product");
    successToast(msg);
  }
  return {
    createNewProduct,
    loading,
  };
}
