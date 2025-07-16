<script lang="ts" setup>
import type { FormSubmitEvent } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { ProductEditScheme } from "~/schemas/product.edit.scheme";

const resolver = ref(zodResolver(ProductEditScheme));
const isForm = ref(false);
const category = ref("");

function showSubCategoryForm() {
  isForm.value = !isForm.value;
}
function obtainCategory(name: string) {
  category.value = name;
}

function onUpload() {
  console.log("File uploaded successfully!");
}

const onFormSubmit = ({ valid, values }: FormSubmitEvent) => {
  if (valid) {
    console.log("Form submitted successfully!", values);
  } else {
    console.log("Form submission failed!");
  }
};
</script>

<template>
  <Form class="product-edit" :resolver="resolver" @submit="onFormSubmit">
    <FileUpload
      url="/api/upload"
      accept="image/*"
      :maxFileSize="10000000"
      @upload="onUpload"
      :chooseLabel="$t('inventory.form.changeImage')"
      :fileLimit="1"
      :showUploadButton="false"
      :showCancelButton="false"
      :chooseButtonProps="{
        severity: 'contrast',
      }"
      chooseIcon="none"
    />
    <CustomTextField
      :label="$t('inventory.form.name')"
      id="idNameProduct"
      name="product"
    />
    <CustomNumberField
      :label="$t('inventory.form.salePrice')"
      id="idPriceSale"
      name="priceSale"
      :options="{ prefix: '$', min: 0 }"
    />
    <CustomNumberField
      :label="$t('inventory.form.buyingPrice')"
      id="idPriceBuying"
      name="priceBuying"
      :options="{ prefix: '$', min: 0 }"
    />
    <CustomNumberField
      :label="$t('inventory.form.quantity')"
      id="idStock"
      name="stock"
      :showButtons="true"
      :options="{ min: 0, suffix: ' u/c' }"
    />
    <InventoryNewCategory
      @is-form="showSubCategoryForm"
      @category="obtainCategory"
    />
    <InventoryNewSubcategory :showForm="isForm" :category="category" />
    <Button
      type="submit"
      severity="success"
      rounded
      raised
      :label="$t('inventory.form.saveButton')"
    >
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
