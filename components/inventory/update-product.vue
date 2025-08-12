<script lang="ts" setup>
import type { UpdateProductRequest } from "~/interfaces/inventory/product/request/update.product.request";
import type { GetProduct } from "~/interfaces/inventory/product/response/get.product";
import {
  updateProductScheme,
  type updatedProduct,
} from "~/schemas/update.product.scheme";
const props = defineProps<{
  product: GetProduct;
}>();
const { t } = useI18n();
const { modalData, modalState, open, close, getComponent } =
  useInventoryModalHandler();
const { update } = useUpdateProduct();
const { subcategories, refresh } = useGetSubcategory();
const { categories, categoryRefresh } = useGetCategory();
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
  validationSchema: toTypedSchema(updateProductScheme),
  initialValues: initialValues,
});
const originalValues = reactive({ ...values });
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
    resetField("subcategoryId", { value: "" });
    refresh(id!);
  }
);
const send = computed(() => {
  return (
    meta.value.dirty &&
    JSON.stringify(values) !== JSON.stringify(originalValues)
  );
});

const onSubmit = handleSubmit(async (values: updatedProduct) => {
  const productUpdated: UpdateProductRequest = {
    id: props.product.id,
    name: values.product,
    description: values.description,
    priceBuy: values.priceBuying,
    priceSell: values.priceSale,
    stock: values.stock,
    subcategoryId: values.subcategoryId,
  };
  update(productUpdated);
});

onMounted(() => {
  refresh(values.category!);
});
</script>

<template>
  <section class="editProduct">
    <h3 class="editProduct-title">{{ $t("inventory.editProduct") }}</h3>
    <form class="editProduct-form" @submit="onSubmit">
      <CustomFileUpload name="image" :image="product.imagePath" :show="false" />
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
          button1-icon="grommet-icons:edit"
          :label="$t('inventory.select.categoryPlaceholder')"
          :prop-options="categories"
          :new-action-label="$t('inventory.newCategoryButton')"
          @click-new="onNewCategory"
          @on-click1="onUpdateCategory"
        />
        <CustomSelectInput
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
          type="submit"
          severity="success"
          rounded
          :disabled="!send"
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
.editProduct {
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
