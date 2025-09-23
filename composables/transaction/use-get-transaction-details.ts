import type { GetTransactionDetails } from "~/interfaces/transaction/response/get.transaction.details";

export default function useGetTransaction() {
  const details = ref<GetTransactionDetails[] | null>();
  const loading = ref(false);

  async function getDetails(id: string) {
    const {
      data,
      execute,
      loading: load,
    } = useApiFetch<GetTransactionDetails[]>("detail-transaction", {
      query: {
        transactionId: id,
      },
    });
    watch(load, (val) => {
      loading.value = val;
    });
    await execute();
    details.value = data.value ?? null;
  }
  return {
    getDetails,
    details,
    loading,
  };
}
