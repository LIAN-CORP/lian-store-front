import { ErrorMap } from "~/constants/error.map";

export default function useHandleResponse() {
  const { t } = useI18n();

  function getErrorTranslate(key: string): string {
    const translationKey = ErrorMap[key] || "response.error.UNKNOWN_ERROR";
    const msg = t(translationKey);
    return msg;
  }
  function getSuccessTranslate(key: string, params?: Record<string, unknown>) {
    return t(key, params!);
  }

  return {
    getErrorTranslate,
    getSuccessTranslate,
  };
}
