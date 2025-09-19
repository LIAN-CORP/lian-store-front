import type { getListDebtResponse } from "~/interfaces/debt/response/get.list.debt.response";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetDebt() {
  const debts = ref<paginatedResponse<getListDebtResponse> | null>(null);
  const loading = ref<boolean>(false);
  async function getDebts(page: number, size: number) {
    const url = useGetApiUrl("debt/active");
    try {
      loading.value = true;
      debts.value = await $fetch<paginatedResponse<getListDebtResponse>>(url, {
        query: {
          page: page,
          size: size,
          dateAsc: true,
        },
      });
    } catch (e: any) {
      debts.value = null;
    } finally {
      loading.value = false;
    }
  }
  return {
    debts,
    loading,
    getDebts,
  };
}
