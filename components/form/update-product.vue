<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import type { FormSubmitEvent } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import {
  ProductEditScheme,
  type ProductEditData,
} from "~/schemas/product.edit.scheme";

const resolver = ref(zodResolver(ProductEditScheme));

const selected = ref(null);
const categories = ref([
  { name: "Categoria 1", id: 1 },
  { name: "Categoria 2", id: 2 },
  { name: "Categoria 3", id: 3 },
]);
const showSubcategory = ref(false);
const showCategory = ref(false);
function onShowCategoryForm() {
  showCategory.value = !showCategory.value;
}
function onShowSubcategoryForm() {
  showSubcategory.value = !showSubcategory.value;
}

const productData = ref<ProductEditData>({
  product: "",
  priceBuying: 0,
  priceSale: 0,
  stock: 0,
});

function onUpload() {
  console.log("File uploaded successfully!");
}

const onFormSubmit = ({ valid }: FormSubmitEvent) => {
  if (valid) {
    console.log("Form submitted successfully!", productData.value);
  } else {
    console.log("Form submission failed!");
  }
};
</script>

<template>
  <Form
    class="product-edit"
    v-slot="$form"
    :resolver="resolver"
    @submit="onFormSubmit"
  >
    <FileUpload
      url="/api/upload"
      accept="image/*"
      :maxFileSize="10000000"
      @upload="onUpload"
      chooseLabel="cambiar imagen"
      :fileLimit="1"
      :showUploadButton="false"
      :showCancelButton="false"
      :chooseButtonProps="{
        severity: 'contrast',
      }"
      chooseIcon="none"
    />
    <CustomTextField
      label="nombre del producto"
      id="idNameProduct"
      name="product"
      v-model="productData.product"
      :error="$form.product?.error?.message"
    />
    <CustomNumberField
      label="precio de venta"
      id="idPriceSale"
      name="priceSale"
      v-model="productData.priceSale"
      :error="$form.priceSale?.error?.message"
      :options="{ prefix: '$', min: 0 }"
    />
    <CustomNumberField
      label="precio de compra"
      id="idPriceBuying"
      name="priceBuying"
      v-model="productData.priceBuying"
      :error="$form.priceBuying?.error?.message"
      :options="{ prefix: '$', min: 0 }"
    />
    <CustomNumberField
      label="cantidad"
      id="idStock"
      name="stock"
      v-model="productData.stock"
      :showButtons="true"
      :error="$form.stock?.error?.message"
      :options="{ min: 0, suffix: ' u/c' }"
    />
    <article class="category-form">
      <InputGroup>
        <InputGroupAddon>
          <Button severity="secondary" @click="onShowCategoryForm">
            <template #icon>
              <Icon icon="mingcute:add-fill" width="20" height="20" />
            </template>
          </Button>
        </InputGroupAddon>
        <Select
          optionLabel="name"
          placeholder="Categoría"
          v-model="selected"
          :options="categories"
          :disabled="showCategory"
        />
      </InputGroup>
      <FormNewCategory v-if="showCategory" />
    </article>

    <article v-if="selected != null || showCategory" class="subcategory-form">
      <InputGroup>
        <InputGroupAddon>
          <Button severity="secondary" @click="onShowSubcategoryForm">
            <template #icon>
              <Icon icon="mingcute:add-fill" width="20" height="20" />
            </template>
          </Button>
        </InputGroupAddon>
        <Select
          optionLabel="name"
          placeholder="SubCategoría"
          :disabled="showSubcategory || showCategory"
        />
      </InputGroup>
      <FormNewCategory v-if="showSubcategory || showCategory" />
    </article>

    <Button type="submit" severity="success" rounded raised label="Guardar">
    </Button>
  </Form>
</template>

<style lang="scss" scoped>
.product-edit {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 1rem;
}
</style>
