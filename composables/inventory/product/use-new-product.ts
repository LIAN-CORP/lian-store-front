import type { ErrorResponse } from "~/interfaces/error.response";
import type { NewProductRequest } from "~/interfaces/inventory/product/request/new.product.request";

export default function useNewProduct() {
  const loading = ref<boolean>(false);
  const { errorToast, successToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();

  async function createNewProduct(image: File, product: NewProductRequest) {
    const url = useGetApiUrl("product", "stockApi");
    let msg: string;
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(product)], {
      type: "application/json",
    });
    formData.append("image", image);
    formData.append("product", jsonBlob);
    try {
      loading.value = true;
      await fetch(url, {
        method: "POST",
        body: formData,
      });
      msg = getSuccessTranslate("response.success.new_product");
      successToast(msg);
    } catch (e: any) {
      const error = e.data as ErrorResponse;
      msg = getErrorTranslate(error.type);
      errorToast(msg);
    } finally {
      loading.value = false;
    }
  }
  return {
    createNewProduct,
    loading,
  };
}
