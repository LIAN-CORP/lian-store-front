import {
  InventoryNewCategory,
  InventoryNewSubcategory,
  InventoryUpdateCategory,
  InventoryUpdateSubcategory,
} from "#components";

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
      NewCategory: t("inventory.newCategory.title"),
      NewSubcategory: t("inventory.newSubcategory.title"),
      EditCategory: t("inventory.updateCategory.title"),
      EditSubcategory: t("inventory.updateSubcategory.title"),
    };
    modalData.activeFormTranslate = translations[modalData.activeForm] || "";
  }
  function getComponent() {
    switch (modalData.activeForm) {
      case "NewCategory":
        return InventoryNewCategory;
      case "EditCategory":
        return InventoryUpdateCategory;
      case "NewSubcategory":
        return InventoryNewSubcategory;
      case "EditSubcategory":
        return InventoryUpdateSubcategory;
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
