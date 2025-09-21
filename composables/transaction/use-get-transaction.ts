import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";
import type { GetTransaction } from "~/interfaces/transaction/response/get.transaction";

export default function useGetTransaction() {
  const token = useCookie("access_token");
  const transactions = ref<paginatedResponse<GetTransaction> | null>();
  const loading = ref(false);
  const url = useGetApiUrl("transaction");

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
          headers: {
            Authorization: token.value ? `Bearer ${token.value}` : "",
          },
        }
      );
    } catch (e: any) {
      transactions.value = null;
    } finally {
      loading.value = false;
    }
  }
  return {
    getTransactions,
    transactions,
    loading,
  };
}
