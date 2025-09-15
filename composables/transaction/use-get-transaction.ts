import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";
import type { GetTransaction } from "~/interfaces/transaction/response/get.transaction";

export default function useGetTransaction() {
  const transactions = ref<paginatedResponse<GetTransaction> | null>();
  const loading = ref(false);
  const url = useGetApiUrl("transaction", "transactionApi");

  async function getTransactions(
    page: number,
    size: number,
    initDate?: string,
    endDate?: string
  ) {
    try {
      loading.value = true;
      transactions.value = await $fetch<paginatedResponse<GetTransaction>>(
        url,
        {
          params: {
            page: page,
            size: size,
            start: initDate,
            end: endDate,
          },
        }
      );
    } catch (e: any) {
      transactions.value = null;
    } finally {
      loading.value = false;
    }
  }

  function formatDate(arr: number[]) {
    return new Date(arr[0], arr[1] - 1, arr[2]).toLocaleDateString("es-CO");
  }

  return {
    getTransactions,
    transactions,
    loading,
    formatDate,
  };
}
