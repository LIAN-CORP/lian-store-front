import type { ErrorResponse } from "~/interfaces/error.response";

export default function useDeleteTransaction() {
  const loading = ref(false);
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function onDeleteTransaction(id: string) {
    const url = useGetApiUrl(`transaction/${id}`, "transactionApi");
    try {
      loading.value = true;
      await $fetch(url, {
        method: "DELETE",
      });
      const msg = getSuccessTranslate("response.success.delete_category");
      infoToast(msg);
    } catch (e: any) {
      const error = e as ErrorResponse;
      const msg = getErrorTranslate(error.type);
      errorToast(msg);
    } finally {
      loading.value = false;
    }
  }
  return {
    loading,
    onDeleteTransaction,
  };
}
