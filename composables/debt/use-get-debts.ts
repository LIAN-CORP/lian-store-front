import type { getListDebtResponse } from "~/interfaces/debt/response/get.list.debt.response";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetDebt() {
  const result = reactive<{
    debts: paginatedResponse<getListDebtResponse> | null;
    loading: boolean;
  }>({
    debts: null,
    loading: false,
  });

  async function getDebts(page: number, size: number) {
    const url = useGetApiUrl("debt/active", "paymentApi");
    try {
      result.loading = true;
      result.debts = await $fetch<paginatedResponse<getListDebtResponse>>(url, {
        query: {
          page: page,
          size: size,
          dateAsc: true,
        },
      });
    } catch (e: any) {
      result.debts = null;
    } finally {
      result.loading = false;
    }
    return result;
  }
  return {
    result,
    getDebts,
  };
}
