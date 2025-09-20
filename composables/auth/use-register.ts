import type { RegisterRequest } from "~/interfaces/auth/request/register.request";
import type { ErrorResponse } from "~/interfaces/error.response";

export default function useRegister() {
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
      console.log("se creó");
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
