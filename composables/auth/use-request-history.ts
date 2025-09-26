import type { RegistrationHistoryResponse } from "~/interfaces/auth/response/registration.history.response";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useRegistrationHistory() {
  const history = ref<paginatedResponse<RegistrationHistoryResponse> | null>();
  const loading = ref(false);
  async function getHistory(page: number, size: number, status?: string) {
    const {
      data,
      execute,
      loading: load,
    } = useApiFetch<paginatedResponse<RegistrationHistoryResponse>>(
      "user/registration/history",
      {
        query: {
          page: page,
          size: size,
          status: status,
        },
      }
    );
    watch(load, (val) => {
      loading.value = val;
    });
    await execute();
    history.value = data.value ?? null;
  }
  return {
    getHistory,
    history,
    loading,
  };
}
