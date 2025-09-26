import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";
import type { GetTransaction } from "~/interfaces/transaction/response/get.transaction";

interface TransactionFilters {
  page: number;
  size: number;
  start?: string;
  end?: string;
  type?: string;
  clientId?: string;
}

export default function useGetTransaction() {
  const transactions = ref<paginatedResponse<GetTransaction> | null>();
  const loading = ref(false);

  async function getTransactions(filters: TransactionFilters) {
    const {
      data,
      execute,
      loading: load,
    } = useApiFetch<paginatedResponse<GetTransaction>>("transaction", {
      query: filters,
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
