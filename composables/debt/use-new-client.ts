import type { NewClientRequest } from "~/interfaces/debt/request/new.client.request";

export default function useNewClient() {
  const loading = ref<boolean>(false);
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  const { errorToast, successToast } = useCreateToast();

  async function saveClient(client: NewClientRequest) {
    const {
      loading: load,
      error,
      execute,
    } = useApiFetch("client", {
      method: "POST",
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
    successToast(msg);
  }

  return {
    loading,
    saveClient,
  };
}
