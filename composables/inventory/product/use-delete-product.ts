import type { ErrorResponse } from "~/interfaces/error.response";

export default function useDeleteProduct() {
  const loading = ref<boolean>(false);
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function deleteProduct(id: string) {
    const url = useGetApiUrl(`product/${id}`);
    let msg: string;
    try {
      loading.value = true;
      await $fetch(url, {
        method: "DELETE",
      });
      msg = getSuccessTranslate("response.success.delete_product");
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
    deleteProduct,
    loading,
  };
}
