<script lang="ts" setup>
import type { NewProductRequest } from "~/interfaces/inventory/product/request/new.product.request";
import {
  NewProductScheme,
  type NewProductInferType,
} from "~/schemas/new.product.scheme";
const { modalState, modalData, open, close, getComponent } =
  useInventoryModalHandler();
const { t } = useI18n();
const locale = useLocalePath();
const { deleteSubcategory, loading: loadDeleteSub } = useDeleteSubcategory();
const { deleteCategory, loading: loadDeleteCat } = useDeleteCategory();
const { onConfirmDelete } = useConfirmDialog();
const { subcategories, refresh } = useGetSubcategory();
const { categories, fetchAllCategories } = useGetCategory();
const scheme = NewProductScheme(t);
const { createNewProduct, loading: loadNewProduct } = useNewProduct();
const isLoading = computed(
  () => loadDeleteCat.value || loadDeleteSub.value || loadNewProduct.value
);
const { handleSubmit, resetField, resetForm, values } = useForm({
  name: "newProduct",
  validationSchema: toTypedSchema(scheme),
});
const refreshActions: Record<string, () => void> = {
  NewCategory: async () => await fetchAllCategories(),
  EditCategory: async () => {
    await fetchAllCategories();
    close();
  },
  NewSubcategory: () => refresh(values.category?.id!),
  EditSubcategory: () => {
    refresh(values.category?.id!);
    close();
  },
};
function getModalProps() {
  switch (modalData.activeForm) {
    case "NewCategory":
      return {};
    case "EditCategory":
      return { categoryId: values.category?.id };
    case "NewSubcategory":
      return { categoryId: values.category?.id };
    case "EditSubcategory":
      return {
        subcategoryId: values.subcategory?.id,
      };
    default:
      return {};
  }
}
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
    message: t("confirm.delete.category.message", {
      name: values.category?.name,
    }),
    onAccept: async () => {
      if (!values.category) return;
      await deleteCategory(values.category.id!);
      await fetchAllCategories();
      resetField("subcategory");
      resetField("category");
    },
  });
}
function onDeleteSubcategory() {
  onConfirmDelete({
    message: t("confirm.delete.subcategory.message", {
      name: values.subcategory?.name,
    }),
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

async function onCancel() {
  await navigateTo(locale("/inventory"));
}

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
onMounted(async () => {
  await fetchAllCategories();
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
            currency="COP"
            mode="currency"
            name="priceSale"
            :options="{ prefix: '$', min: 0 }"
            input-color="white"
          />
          <CustomNumberField
            :label="$t('inventory.newProduct.buyingPrice')"
            id="idPriceBuying"
            name="priceBuying"
            currency="COP"
            mode="currency"
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
            option-label="name"
            :label="$t('inventory.select.categoryPlaceholder')"
            :prop-options="categories?.content"
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
            option-label="name"
            button1-icon="grommet-icons:edit"
            button2-icon="material-symbols:delete-rounded"
            button2-severity="danger"
            :new-action-label="$t('inventory.newSubcategoryButton')"
            :disabled-button1="!values.subcategory"
            :disabled-button2="!values.subcategory"
            :disabled="!values.category"
            :prop-options="subcategories?.content"
            @click-new="onNewSubcategory"
            @on-click1="onUpdateSubcategory"
            @on-click2="onDeleteSubcategory"
            :label="$t('inventory.select.subcategoryPlaceholder')"
          />
          <Button
            severity="secondary"
            rounded
            :label="$t('button.cancel')"
            @click="onCancel"
          />
          <Button
            type="submit"
            severity="success"
            rounded
            raised
            :label="$t('button.save')"
          />
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
        v-bind="getModalProps()"
        @created="handleRefresh"
      />
    </template>
  </Dialog>
  <LoadingScreen :state="isLoading" />
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
