import type { GetListDebtResponse } from "~/interfaces/debt/response/get.list.debt.response";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useGetDebt() {
  const debts = ref<paginatedResponse<GetListDebtResponse> | null>(null);
  const loading = ref<boolean>(false);
  async function getDebts(page: number, size: number) {
    const {
      data,
      execute,
      loading: load,
    } = useApiFetch<paginatedResponse<GetListDebtResponse>>("debt/active", {
      query: {
        page: page,
        size: size,
        dateAsc: true,
      },
    });
    watch(load, (val) => {
      loading.value = val;
    });
    await execute();
    debts.value = data.value ?? null;
  }
  return {
    debts,
    loading,
    getDebts,
  };
}
