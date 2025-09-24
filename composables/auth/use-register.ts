import type { RegisterRequest } from "~/interfaces/auth/request/register.request";
import type { ErrorResponse } from "~/interfaces/error.response";

export default function useRegister() {
  const { successToast } = useCreateToast();
  const { getSuccessTranslate } = useHandleResponse();
  const loading = ref<boolean>(false);
  const url = useGetApiUrl("auth/register");
  const { getErrorTranslate } = useHandleResponse();
  const { errorToast } = useCreateToast();

  async function onRegister(auth: RegisterRequest) {
    loading.value = true;
    try {
      await $fetch(url, {
        method: "POST",
        body: auth,
      });
      const msg = getSuccessTranslate("response.success.new_user");
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
    onRegister,
  };
}
