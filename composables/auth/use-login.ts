import type { LoginRequest } from "~/interfaces/auth/request/login.request";
import type { LoginResponse } from "~/interfaces/auth/response/login.response";
import type { ErrorResponse } from "~/interfaces/error.response";

export default function useLogin() {
  const loading = ref<boolean>(false);
  const url = useGetApiUrl("auth/login");
  const { getErrorTranslate } = useHandleResponse();
  const { errorToast } = useCreateToast();

  async function login(auth: LoginRequest) {
    loading.value = true;
    try {
      const token = useCookie("access_token", {
        maxAge: 60 * 58,
        sameSite: "strict",
      });
      const role = useCookie("role", {
        maxAge: 60 * 58,
        sameSite: "strict",
      });
      const result = await $fetch<LoginResponse>(url, {
        method: "POST",
        body: auth,
      });
      token.value = result.access_token;
      role.value = result.role;
      await navigateTo("/inventory");
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
    login,
  };
}
