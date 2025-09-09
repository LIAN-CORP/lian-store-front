import { DebtsNewClient, TransactionSelectProduct } from "#components";

export default function useInventoryModalHandler() {
  const { t } = useI18n();
  const modalState = ref(false);
  const modalData = reactive<{
    activeForm: string;
    activeFormTranslate: string;
  }>({
    activeForm: "",
    activeFormTranslate: "",
  });

  function open(formName: string) {
    modalData.activeForm = formName;
    modalState.value = true;
    onGetTranslations();
  }
  function close() {
    modalState.value = false;
    modalData.activeForm = "";
    modalData.activeFormTranslate = "";
  }

  function onGetTranslations() {
    const translations: Record<string, string> = {
      SelectProducts: t("transaction.selectProductTitle"),
      NewClient: t("transaction.newClient.title"),
    };
    modalData.activeFormTranslate = translations[modalData.activeForm] || "";
  }
  function getComponent() {
    switch (modalData.activeForm) {
      case "SelectProducts":
        return TransactionSelectProduct;
      case "NewClient":
        return DebtsNewClient;
      default:
        return null;
    }
  }
  return {
    modalState,
    modalData,
    open,
    close,
    getComponent,
  };
}
