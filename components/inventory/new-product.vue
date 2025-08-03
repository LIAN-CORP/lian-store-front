<script lang="ts" setup>
import {
  ProductEditScheme,
  type ProductEditData,
} from "~/schemas/product.edit.scheme";
const { t } = useI18n();
const { subcategories, refresh } = useGetSubcategory();
const { categories, categoryRefresh } = useGetCategory();
const { handleSubmit, resetField } = useForm({
  name: "newProduct",
  validationSchema: toTypedSchema(ProductEditScheme),
});
const selectedCategory = ref("");

const showForm = ref(false);
const activeForm = ref("");

function onShowCategoryForm(name: string) {
  subcategories.value = null;
  selectedCategory.value = "";
  resetField("subcategoryId");
  showForm.value = !showForm.value;
  activeForm.value = name;
}

function onShowSubcategoryForm(name: string) {
  activeForm.value = name;
  showForm.value = !showForm.value;
}

function updateSubcategories(id: string) {
  selectedCategory.value = id;
  if (!id) {
    subcategories.value = [];
    return;
  }
  refresh(id);
}

const onSubmit = handleSubmit((values: ProductEditData) => {
  console.log("data", values);
});
</script>

<template>
  <section class="newProduct">
    <h3 class="newProduct-title">{{ $t("inventory.newProduct.title") }}</h3>
    <form class="newProduct-form" @submit="onSubmit">
      <CustomFileUpload />
      <div class="fields">
        <CustomTextField
          :label="$t('inventory.newProduct.name')"
          id="idNameProduct"
          name="product"
          input-color="white"
        />
        <CustomNumberField
          :label="$t('inventory.newProduct.salePrice')"
          id="idPriceSale"
          name="priceSale"
          :options="{ prefix: '$', min: 0 }"
          input-color="white"
        />
        <CustomNumberField
          :label="$t('inventory.newProduct.buyingPrice')"
          id="idPriceBuying"
          name="priceBuying"
          :options="{ prefix: '$', min: 0 }"
          input-color="white"
        />
        <CustomNumberField
          :label="$t('inventory.newProduct.quantity')"
          id="idStock"
          name="stock"
          :showButtons="true"
          :options="{ min: 0, suffix: ' u/c' }"
          input-color="white"
        />
        <CustomSelectInput
          name="category"
          :title="$t('inventory.newCategory.title')"
          :label="$t('inventory.select.categoryPlaceholder')"
          :prop-options="categories"
          @on-click="onShowCategoryForm"
          @model-value="updateSubcategories"
        />
        <CustomSelectInput
          name="subcategoryId"
          :title="$t('inventory.newSubcategory.title')"
          :prop-options="subcategories"
          @on-click="onShowSubcategoryForm"
          :disabled="!selectedCategory"
          :label="$t('inventory.select.subcategoryPlaceholder')"
        />
        <Button
          type="submit"
          severity="success"
          rounded
          raised
          :label="$t('button.save')"
        >
        </Button>
      </div>
    </form>
    <Dialog v-model:visible="showForm" :header="activeForm" modal>
      <template #default>
        <InventoryNewCategory
          v-if="activeForm === $t('inventory.newCategory.title')"
          @created="categoryRefresh"
        />
        <InventoryNewSubcategory
          :category-id="selectedCategory"
          v-if="activeForm === $t('inventory.newSubcategory.title')"
          @created="refresh(selectedCategory)"
        />
      </template>
    </Dialog>
  </section>
</template>

<style lang="scss" scoped>
.newProduct {
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: inset 0px 0px 17px 0px rgba(0, 0, 0, 0.12);
  &-title {
    text-align: center;
    padding: 0.5rem 1rem;
    background-color: #172455;
    border-radius: 1rem 1rem 0 0;
    font-size: 1.5rem;
    color: white;
  }
  &-form {
    display: flex;
    padding: 1rem;
    gap: 1rem;
    .fields {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}
@media (max-width: 750px) {
  .newProduct {
    &-form {
      flex-direction: column;
      .fields {
        gap: 1rem;
        width: auto;
      }
    }
  }
}
@media (max-width: 500px) {
  .newProduct {
    &-form {
      padding: 0.5rem;
      .fields {
        gap: 1rem;
        width: auto;
      }
    }
  }
}
</style>
