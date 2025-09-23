import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";
import type { GetTransaction } from "~/interfaces/transaction/response/get.transaction";

export default function useGetTransaction() {
  const transactions = ref<paginatedResponse<GetTransaction> | null>();
  const loading = ref(false);

  async function getTransactions(
    page: number,
    size: number,
    initDate?: string,
    endDate?: string
  ) {
    const {
      data,
      execute,
      loading: load,
    } = useApiFetch<paginatedResponse<GetTransaction>>("transaction", {
      query: {
        page: page,
        size: size,
        start: initDate,
        end: endDate,
      },
    });
    watch(load, (val) => {
      loading.value = val;
    });
    await execute();
    transactions.value = data.value ?? null;
  }
  return {
    getTransactions,
    transactions,
    loading,
  };
}
