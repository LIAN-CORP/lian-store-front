import type { ErrorResponse } from "~/interfaces/error.response";
import type { NewProductRequest } from "~/interfaces/inventory/product/request/new.product.request";

export default function useNewProduct() {
  const { errorToast, successToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();

  async function createNewProduct(image: File, product: NewProductRequest) {
    const url = useGetApiUrl("product");
    let msg: string;
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(product)], {
      type: "application/json",
    });
    formData.append("image", image);
    formData.append("product", jsonBlob);
    try {
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
    }
  }
  return {
    createNewProduct,
  };
}
