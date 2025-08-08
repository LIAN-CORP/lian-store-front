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
const send = ref(true);
const { update } = useUpdateProduct();
const { subcategories, refresh } = useGetSubcategory();
const { categories, categoryRefresh } = useGetCategory();
const { handleSubmit, resetField, values, meta } = useForm({
  name: "editProduct",
  validationSchema: toTypedSchema(updateProductScheme),
  initialValues: {
    product: props.product.name,
    description: props.product.description,
    priceBuying: props.product.priceBuy,
    priceSale: props.product.priceSell,
    stock: props.product.stock,
    category: props.product.categoryId,
    subcategoryId: props.product.subcategoryId,
  },
});
const selectedCategory = ref("");
const showForm = ref(false);
const activeForm = ref("");

watch(
  () => values.category,
  (id) => {
    resetField("subcategoryId", { value: "" });
    updateSubcategories(id!);
  }
);
watch(
  () => meta.value.dirty,
  (isDirty) => {
    if (isDirty) {
      send.value = false;
    }
  }
);

function updateSubcategories(id: string) {
  selectedCategory.value = id;
  if (!id) {
    subcategories.value = [];
    return;
  }
  refresh(id);
}
function onShowCategoryForm(name: string) {
  subcategories.value = null;
  selectedCategory.value = "";
  showForm.value = !showForm.value;
  activeForm.value = name;
}
function onShowSubcategoryForm(name: string) {
  activeForm.value = name;
  showForm.value = !showForm.value;
}
const onSubmit = handleSubmit(async (values: updatedProduct) => {
  if (!meta.value.dirty) {
    console.log("se cambio algo");
  }
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
  updateSubcategories(values.category!);
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
          label="descripcion"
          id="idDescripcionProduct"
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
          :title="$t('inventory.newCategory.title')"
          :label="$t('inventory.select.categoryPlaceholder')"
          :prop-options="categories"
          @on-click="onShowCategoryForm"
        />
        <CustomSelectInput
          name="subcategoryId"
          :title="$t('inventory.newSubcategory.title')"
          :prop-options="subcategories"
          @on-click="onShowSubcategoryForm"
          :label="$t('inventory.select.subcategoryPlaceholder')"
        />
        <Button
          type="submit"
          severity="success"
          rounded
          :disabled="send"
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
