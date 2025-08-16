import type { ErrorResponse } from "~/interfaces/error.response";

export default function useDeleteProduct() {
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function deleteProduct(id: string) {
    const url = useGetApiUrl(`product/${id}`);
    let msg: string;
    try {
      await $fetch(url, {
        method: "DELETE",
      });
      msg = getSuccessTranslate("response.success.delete_product");
      infoToast(msg);
    } catch (e: any) {
      const error = e as ErrorResponse;
      msg = getErrorTranslate(error.type);
      errorToast(msg);
    }
  }
  return {
    deleteProduct,
  };
}
