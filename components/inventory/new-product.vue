<script lang="ts" setup>
import type { NewProductRequest } from "~/interfaces/inventory/product/request/new.product.request";
import {
  NewProductScheme,
  type NewProduct,
} from "~/schemas/new.product.scheme";
const { modalState, modalData, open, close, getComponent } =
  useInventoryModalHandler();
const { t } = useI18n();
const confirm = useConfirm();
const { deleteCategory } = useDeleteCategory();
const { onConfirmDelete } = useConfirmDialog();
const { errorToast, successToast } = useCreateToast();
const { subcategories, refresh } = useGetSubcategory();
const { categories, categoryRefresh } = useGetCategory();
const { handleSubmit, resetField, values } = useForm({
  name: "newProduct",
  validationSchema: toTypedSchema(NewProductScheme),
});
const { createNewProduct } = useNewProduct();

function onNewCategory() {
  subcategories.value = null;
  resetField("subcategoryId");
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
      await deleteCategory(values.category);
    },
  });
}

function handleRefresh() {
  if (
    modalData.activeForm == "NewCategory" ||
    modalData.activeForm == "EditCategory"
  ) {
    categoryRefresh();
  }
  if (
    modalData.activeForm == "NewSubcategory" ||
    modalData.activeForm == "EditSubcategory"
  ) {
    refresh(values.category!);
  }
}

watch(
  () => values.category,
  (id) => {
    resetField("subcategoryId");
    refresh(id!);
  }
);

const onSubmit = handleSubmit(async (values: NewProduct) => {
  const product: NewProductRequest = {
    name: values.product,
    description: values.description,
    stock: values.stock,
    priceSell: values.priceSale,
    priceBuy: values.priceBuying,
    subcategoryId: values.subcategoryId,
  };
  const result = await createNewProduct(values.image, product);
  if (result.ok) {
    successToast("se creo el producto correctamente");
  } else {
    errorToast("no se pudo crear el producto");
  }
});
</script>

<template>
  <ConfirmDialog />
  <section class="newProduct">
    <h3 class="newProduct-title">{{ $t("inventory.newProduct.title") }}</h3>
    <form class="newProduct-form" @submit="onSubmit">
      <CustomFileUpload name="image" :show="true" />
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
          name="subcategoryId"
          title="subcategory"
          button1-icon="grommet-icons:edit"
          button2-icon="material-symbols:delete-rounded"
          button2-severity="danger"
          :new-action-label="$t('inventory.newSubcategoryButton')"
          :disabled-button1="!values.subcategoryId"
          :disabled-button2="!values.subcategoryId"
          :disabled="!values.category"
          :prop-options="subcategories"
          @click-new="onNewSubcategory"
          @on-click1="onUpdateSubcategory"
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
    <Dialog
      v-model:visible="modalState"
      :header="modalData.activeFormTranslate"
      modal
    >
      <template #default>
        <component
          :is="getComponent()"
          :category-id="values.category!"
          :subcategory-id="values.subcategoryId!"
          @created="handleRefresh"
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
