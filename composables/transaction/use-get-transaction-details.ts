import type { GetTransactionDetails } from "~/interfaces/transaction/response/get.transaction.details";
import type { GetTransactionWithAllDetails } from "~/interfaces/transaction/response/get.transaction.with.all.details";

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
  async function getTransactionWithAllDetails(id: string) {
    const {
      data,
      execute,
      loading: load,
    } = useApiFetch<GetTransactionWithAllDetails>(`transaction/${id}`);
    watch(load, (val) => {
      loading.value = val;
    });
    await execute();
    details.value = data.value?.detail ?? null;
  }
  return {
    getDetails,
    getTransactionWithAllDetails,
    details,
    loading,
  };
}
