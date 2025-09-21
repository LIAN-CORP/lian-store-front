import type { ErrorResponse } from "~/interfaces/error.response";
import type { UpdateProductRequest } from "~/interfaces/inventory/product/request/update.product.request";

export default function useUpdateProduct() {
  const token = useCookie("access_token");

  const loading = ref<boolean>(false);
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();

  async function update(updatedProduct: UpdateProductRequest) {
    const url = useGetApiUrl("product");
    let msg: string;
    try {
      loading.value = true;
      await $fetch.raw(url, {
        method: "PUT",
        body: updatedProduct,
        headers: {
          Authorization: token.value ? `Bearer ${token.value}` : "",
        },
      });
      msg = getSuccessTranslate("response.success.update_product");
      infoToast(msg);
    } catch (e: any) {
      const error = e as ErrorResponse;
      msg = getErrorTranslate(error.type);
      errorToast(msg);
    } finally {
      loading.value = false;
    }
  }
  return {
    update,
    loading,
  };
}
