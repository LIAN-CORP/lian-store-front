<script lang="ts" setup>
import type { NewProductRequest } from "~/interfaces/inventory/product/request/new.product.request";
import {
  NewProductScheme,
  type NewProductInferType,
} from "~/schemas/new.product.scheme";
const { modalState, modalData, open, close, getComponent } =
  useInventoryModalHandler();
const { t } = useI18n();
const { deleteSubcategory } = useDeleteSubcategory();
const { deleteCategory } = useDeleteCategory();
const { onConfirmDelete } = useConfirmDialog();
const { subcategories, refresh } = useGetSubcategory();
const { categories, categoryRefresh } = useGetCategory();
const scheme = NewProductScheme(t);
const { handleSubmit, resetField, resetForm, values } = useForm({
  name: "newProduct",
  validationSchema: toTypedSchema(scheme),
});
const { createNewProduct } = useNewProduct();
const refreshActions: Record<string, () => void> = {
  NewCategory: () => categoryRefresh(),
  EditCategory: () => {
    categoryRefresh();
    close();
  },
  NewSubcategory: () => refresh(values.category?.id!),
  EditSubcategory: () => {
    refresh(values.category?.id!);
    close();
  },
};
function onNewCategory() {
  subcategories.value = null;
  resetField("subcategory");
  open("NewCategory");
}
function onNewSubcategory() {
  open("NewSubcategory");
}
function onUpdateCategory() {
  open("EditCategory");
}
function onUpdateSubcategory() {
  open("EditSubcategory");
}

function onDeleteCategory() {
  onConfirmDelete({
    message: t("confirm.delete.category.message"),
    onAccept: async () => {
      if (!values.category) return;
      await deleteCategory(values.category.id!);
      await categoryRefresh();
      resetField("subcategory");
      resetField("category");
    },
  });
}
function onDeleteSubcategory() {
  onConfirmDelete({
    message: t("confirm.delete.subcategory.message"),
    onAccept: async () => {
      if (!values.subcategory) return;
      await deleteSubcategory(values.subcategory.id!);
      refresh(values.category?.id!);
      resetField("subcategory");
    },
  });
}

function handleRefresh() {
  const action = refreshActions[modalData.activeForm];
  if (action) action();
}

watch(
  () => values.category?.id,
  (id) => {
    resetField("subcategory");
    refresh(id!);
  }
);

const onSubmit = handleSubmit(async (values: NewProductInferType) => {
  const product: NewProductRequest = {
    name: values.product,
    description: values.description,
    stock: values.stock,
    priceSell: values.priceSale,
    priceBuy: values.priceBuying,
    subcategoryId: values.subcategory?.id,
  };
  await createNewProduct(values.image, product);
  resetForm();
});
</script>

<template>
  <ConfirmDialog />

  <section class="new-product-container">
    <h3 class="new-product-title">{{ $t("inventory.newProduct.title") }}</h3>
    <form class="form" @submit="onSubmit">
      <article class="form-content">
        <div class="upload-field">
          <CustomFileUpload name="image" :show="true" />
        </div>
        <div class="fields">
          <CustomTextField
            :label="$t('inventory.newProduct.name')"
            id="idNameProduct"
            name="product"
            input-color="white"
          />
          <CustomTextAreaField
            :label="$t('inventory.newProduct.description')"
            id="idDescriptionProduct"
            name="description"
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
            title="category"
            :label="$t('inventory.select.categoryPlaceholder')"
            :prop-options="categories"
            :new-action-label="$t('inventory.newCategoryButton')"
            button1-icon="grommet-icons:edit"
            button2-icon="material-symbols:delete-rounded"
            button2-severity="danger"
            :disabled-button1="!values.category"
            :disabled-button2="!values.category"
            @click-new="onNewCategory"
            @on-click1="onUpdateCategory"
            @on-click2="onDeleteCategory"
          />
          <CustomSelectInput
            name="subcategory"
            title="subcategory"
            button1-icon="grommet-icons:edit"
            button2-icon="material-symbols:delete-rounded"
            button2-severity="danger"
            :new-action-label="$t('inventory.newSubcategoryButton')"
            :disabled-button1="!values.subcategory"
            :disabled-button2="!values.subcategory"
            :disabled="!values.category"
            :prop-options="subcategories"
            @click-new="onNewSubcategory"
            @on-click1="onUpdateSubcategory"
            @on-click2="onDeleteSubcategory"
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
      </article>
    </form>
  </section>
  <Dialog
    v-model:visible="modalState"
    :header="modalData.activeFormTranslate"
    modal
  >
    <template #default>
      <component
        :is="getComponent()"
        :category-id="values.category?.id!"
        :subcategory-id="values.subcategory?.id!"
        @created="handleRefresh"
      />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.new-product-container {
  background-color: white;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 7px 17px -11px rgba(66, 68, 90, 1);

  gap: 1rem;
  width: auto;
  .new-product-title {
    background-color: #172455;
    border-radius: 0.5rem 0.5rem 0 0;
    color: white;
    text-align: center;
  }
  .form {
    &-content {
      display: flex;
      justify-content: center;
      min-width: 0;
      padding: 1rem;
      .fields {
        display: flex;
        min-width: 0;
        gap: 0.5rem;
        flex-direction: column;
        max-width: 400px;
      }
    }
  }
}
@media (max-width: 800px) {
  .new-product-container {
    .form {
      &-content {
        flex-direction: column;
        .fields {
          max-width: none;
        }
      }
    }
  }
}
</style>
