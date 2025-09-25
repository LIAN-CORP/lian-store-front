import type { RegistrationResponse } from "~/interfaces/auth/response/registration.response";
import type { paginatedResponse } from "~/interfaces/paginatedResponse.interface";

export default function useRegistrationRequest() {
  const request = ref<paginatedResponse<RegistrationResponse> | null>();
  const loading = ref(false);
  async function getRequest(page: number, size: number) {
    const {
      data,
      execute,
      loading: load,
    } = useApiFetch<paginatedResponse<RegistrationResponse>>(
      "user/registration/requests",
      {
        query: {
          page: page,
          size: size,
        },
      }
    );
    watch(load, (val) => {
      loading.value = val;
    });
    await execute();
    request.value = data.value ?? null;
  }
  return {
    getRequest,
    request,
    loading,
  };
}
