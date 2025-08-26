export const useCreateToast = () => {
  const toast = useToast();
  const { t } = useI18n();
  function successToast(message: string) {
    toast.add({
      severity: "success",
      summary: t("toast.success"),
      detail: message,
      life: 5000,
      closable: true,
    });
  }
  function errorToast(message: string) {
    toast.add({
      severity: "error",
      summary: t("toast.error"),
      detail: message,
      life: 5000,
      closable: true,
    });
  }
  function infoToast(message: string) {
    toast.add({
      severity: "info",
      summary: t("toast.info"),
      detail: message,
      life: 5000,
      closable: true,
    });
  }
  return {
    successToast,
    errorToast,
    infoToast,
  };
};
