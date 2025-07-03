<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import type { FormSubmitEvent } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { ProductEditScheme } from "~/schemas/product.edit.scheme";

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
          :placeholder="$t('inventory.form.categoryPlaceholder')"
          v-model="selected"
          :options="categories"
          :disabled="showCategory"
        />
      </InputGroup>
      <InventoryNewCategory v-if="showCategory" />
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
          :placeholder="$t('inventory.form.subcategoryPlaceholder')"
          :disabled="showSubcategory || showCategory"
        />
      </InputGroup>
      <InventoryNewCategory v-if="showSubcategory || showCategory" />
    </article>

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
