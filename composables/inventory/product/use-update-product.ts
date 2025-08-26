import type { ErrorResponse } from "~/interfaces/error.response";
import type { UpdateProductRequest } from "~/interfaces/inventory/product/request/update.product.request";

export default function useUpdateProduct() {
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();

  async function update(updatedProduct: UpdateProductRequest) {
    const url = useGetApiUrl("product", "stockApi");
    let msg: string;
    try {
      $fetch.raw(url, {
        method: "PUT",
        body: updatedProduct,
      });
      msg = getSuccessTranslate("response.success.update_product");
      infoToast(msg);
    } catch (e: any) {
      const error = e as ErrorResponse;
      msg = getErrorTranslate(error.type);
      errorToast(msg);
    }
  }
  return {
    update,
  };
}
