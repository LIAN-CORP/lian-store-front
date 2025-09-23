import type { UpdateClientRequest } from "~/interfaces/debt/request/update.client.request";

export default function useNewClient() {
  const loading = ref<boolean>(false);
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  const { errorToast, infoToast } = useCreateToast();

  async function updateClient(client: UpdateClientRequest) {
    const {
      loading: load,
      error,
      execute,
    } = useApiFetch("client", {
      method: "PUT",
      body: client,
    });
    watch(load, (val) => {
      loading.value = val;
    });
    await execute();
    if (error.value) {
      const msg = getErrorTranslate(error.value.type);
      errorToast(msg);
      return;
    }
    const msg = getSuccessTranslate("response.success.new_client");
    infoToast(msg);
  }

  return {
    loading,
    updateClient,
  };
}
