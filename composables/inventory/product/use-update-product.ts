import type { ErrorResponse } from "~/interfaces/error.response";
import type { UpdateProductRequest } from "~/interfaces/inventory/product/request/update.product.request";

export default function useUpdateProduct() {
  const { errorToast, successToast } = useCreateToast();
  async function update(updatedProduct: UpdateProductRequest) {
    try {
      const url = useGetApiUrl("product");
      const result = await $fetch.raw(url, {
        method: "PUT",
        body: updatedProduct,
      });
      if (result.status == 200) {
        successToast("se edito correctamente");
      }
    } catch (e: any) {
      const error = e as ErrorResponse;
      errorToast("esto es un error");
    }
  }
  return {
    update,
  };
}
