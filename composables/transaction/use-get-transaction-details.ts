import type { GetTransactionDetails } from "~/interfaces/transaction/response/get.transaction.details";

export default function useGetTransaction() {
  const details = ref<GetTransactionDetails[] | null>();
  const loading = ref(false);
  const url = useGetApiUrl("detail-transaction");

  async function getDetails(id: string) {
    try {
      loading.value = true;
      details.value = await $fetch<GetTransactionDetails[]>(url, {
        params: {
          transactionId: id,
        },
      });
    } catch (e: any) {
      details.value = null;
    } finally {
      loading.value = false;
    }
  }
  return {
    getDetails,
    details,
    loading,
  };
}
