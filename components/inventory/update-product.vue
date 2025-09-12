<script lang="ts" setup>
import type { UpdateProductRequest } from "~/interfaces/inventory/product/request/update.product.request";
import type { GetProduct } from "~/interfaces/inventory/product/response/get.product";
import {
  updateProductScheme,
  type updatedProductInferScheme,
} from "~/schemas/update.product.scheme";
const props = defineProps<{
  product: GetProduct;
}>();
const { t } = useI18n();
const { hasChanges } = useFormChangeHandle();
const { modalData, modalState, open, close, getComponent } =
  useInventoryModalHandler();
const { update, loading } = useUpdateProduct();
const { subcategories, refresh } = useGetSubcategory();
const { categories, categoryRefresh } = useGetCategory();
const scheme = updateProductScheme(t);
const initialValues = {
  product: props.product.name,
  description: props.product.description,
  priceBuying: props.product.priceBuy,
  priceSale: props.product.priceSell,
  stock: props.product.stock,
  category: props.product.categoryId,
  subcategoryId: props.product.subcategoryId,
};
const { handleSubmit, resetField, values, meta } = useForm({
  name: "editProduct",
  validationSchema: toTypedSchema(scheme),
  initialValues: initialValues,
});

const refreshActions: Record<string, () => void> = {
  NewCategory: () => categoryRefresh(),
  EditCategory: () => {
    categoryRefresh();
    close();
  },
  NewSubcategory: () => refresh(values.category!),
  EditSubcategory: () => {
    resetField("subcategoryId");

    refresh(values.category!);
    console.log(subcategories);
    close();
  },
};
const send = hasChanges({ ...initialValues }, values, meta);
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

function handleRefresh() {
  const action = refreshActions[modalData.activeForm];
  if (action) action();
}
watch(
  () => values.category,
  (id) => {
    resetField("subcategoryId", { value: "" });
    refresh(id!);
  }
);

const onSubmit = handleSubmit(async (values: updatedProductInferScheme) => {
  const productUpdated: UpdateProductRequest = {
    id: props.product.id,
    name: values.product,
    description: values.description,
    priceBuy: values.priceBuying,
    priceSell: values.priceSale,
    stock: values.stock,
    subcategoryId: values.subcategoryId,
  };
  await update(productUpdated);
  await navigateTo("/inventory");
});

async function onCancel() {
  await navigateTo("/inventory");
}

onMounted(() => {
  refresh(values.category!);
});
</script>

<template>
  <section class="update-product-container">
    <h3 class="update-product-title">{{ $t("inventory.editProduct") }}</h3>
    <form class="form" @submit="onSubmit">
      <article class="form-content">
        <div class="upload-field">
          <CustomFileUpload
            name="image"
            :image="product.imagePath"
            :show="false"
          />
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
            option-value="id"
            name="category"
            button1-icon="grommet-icons:edit"
            :label="$t('inventory.select.categoryPlaceholder')"
            :prop-options="categories"
            :new-action-label="$t('inventory.newCategoryButton')"
            @click-new="onNewCategory"
            @on-click1="onUpdateCategory"
          />
          <CustomSelectInput
            option-value="id"
            name="subcategoryId"
            button1-icon="grommet-icons:edit"
            :disabled-button1="!values.subcategoryId"
            :label="$t('inventory.select.subcategoryPlaceholder')"
            :disabled="!values.category"
            :prop-options="subcategories"
            :new-action-label="$t('inventory.newSubcategoryButton')"
            @click-new="onNewSubcategory"
            @on-click1="onUpdateSubcategory"
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
            :disabled="!send"
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
        :category-id="values.category!"
        :subcategory-id="values.subcategoryId!"
        @created="handleRefresh"
      />
    </template>
  </Dialog>
  <LoadingScreen :state="loading" />
</template>

<style lang="scss" scoped>
.update-product-container {
  background-color: white;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 7px 17px -11px rgba(66, 68, 90, 1);
  gap: 1rem;
  width: auto;
  .update-product-title {
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
  .update-product-container {
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
