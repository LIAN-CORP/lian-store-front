<script lang="ts" setup>
import type { FormSubmitEvent } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { ProductEditScheme } from "~/schemas/product.edit.scheme";

const { data } = await useGetCategory();
const resolver = ref(zodResolver(ProductEditScheme));
const subcategories = ref();

const showForm = ref(false);
const activeForm = ref("");

function onShowCategoryForm(name: string) {
  showForm.value = !showForm.value;
  activeForm.value = name;
}

async function updateSubcategories(name: string) {
  if (!name) subcategories.value = [];
  const fetchSubCategories = await useGetSubcategory(name);
  subcategories.value = fetchSubCategories?.content;
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
  <section class="newProduct">
    <h3 class="newProduct-title">New Product</h3>
    <Form class="newProduct-form" :resolver="resolver" @submit="onFormSubmit">
      <CustomFileUpload />
      <div class="fields">
        <CustomTextField
          :label="$t('inventory.form.name')"
          id="idNameProduct"
          name="product"
          input-color="white"
        />
        <CustomNumberField
          :label="$t('inventory.form.salePrice')"
          id="idPriceSale"
          name="priceSale"
          :options="{ prefix: '$', min: 0 }"
          input-color="white"
        />
        <CustomNumberField
          :label="$t('inventory.form.buyingPrice')"
          id="idPriceBuying"
          name="priceBuying"
          :options="{ prefix: '$', min: 0 }"
          input-color="white"
        />
        <CustomNumberField
          :label="$t('inventory.form.quantity')"
          id="idStock"
          name="stock"
          :showButtons="true"
          :options="{ min: 0, suffix: ' u/c' }"
          input-color="white"
        />
        <CustomSelectInput
          name="category"
          :label="$t('inventory.form.categoryPlaceholder')"
          :prop-options="data?.content"
          @on-click="onShowCategoryForm"
          @model-value="updateSubcategories"
        />
        <CustomSelectInput
          name="subcategoryId"
          :prop-options="subcategories"
          @on-click="onShowCategoryForm"
          label="subcategoria"
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
    </Form>
    <Dialog v-model:visible="showForm" :header="activeForm" modal>
      <template #default>
        <InventoryNewCategory v-if="activeForm === 'category'" />
        <InventoryNewSubcategory v-if="activeForm === 'subcategoryId'" />
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
