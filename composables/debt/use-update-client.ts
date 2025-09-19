import type { UpdateClientRequest } from "~/interfaces/debt/request/update.client.request";
import type { ErrorResponse } from "~/interfaces/error.response";

export default function useNewClient() {
  const loading = ref<boolean>(false);
  const url = useGetApiUrl("client");
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  const { errorToast, successToast } = useCreateToast();

  async function updateClient(client: UpdateClientRequest) {
    loading.value = true;
    try {
      await $fetch(url, {
        method: "PUT",
        body: client,
      });
      const msg = getSuccessTranslate("response.success.new_client");
      successToast(msg);
    } catch (e: any) {
      const error = e.data as ErrorResponse;
      const msg = getErrorTranslate(error.type);
      errorToast(msg);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    updateClient,
  };
}
