export default function useConfirmDialog() {
  const confirm = useConfirm();
  const { t } = useI18n();
  function onConfirmDelete({
    message,
    onAccept,
    onReject,
  }: {
    message: string;
    onAccept: () => void | Promise<void>;
    onReject?: () => void | Promise<void>;
  }) {
    confirm.require({
      message: message,
      header: "Confirmar eliminación",
      rejectProps: {
        label: t("button.cancel"),
        severity: "secondary",
        raised: true,
        variant: "outlined",
      },
      acceptProps: {
        label: t("button.delete"),
        severity: "danger",
        raised: true,
      },
      accept: onAccept,
      reject: onReject,
    });
  }
  return {
    onConfirmDelete,
  };
}
