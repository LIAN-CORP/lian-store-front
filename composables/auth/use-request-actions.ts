type Action = "reject" | "accept";
export default function useRequestActions() {
  const loading = ref<boolean>(false);
  const { errorToast, infoToast } = useCreateToast();
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  async function onResponseRequest(action: Action, id: string) {
    const {
      loading: load,
      error,
      execute,
    } = useApiFetch(`user/registration/${action}/${id}`, {
      method: "POST",
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
    const msg = getSuccessTranslate(`response.success.${action}`);
    infoToast(msg);
  }
  return {
    onResponseRequest,
    loading,
  };
}
