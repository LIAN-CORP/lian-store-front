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
  console.log(name);
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
        <InventoryNewCategory
          @is-form="showSubCategoryForm"
          @category="obtainCategory"
        />
        <InventoryNewSubcategory
          :showForm="isForm"
          :category="category"
          prueba="subcategoryId"
        />
        <Button
          type="submit"
          severity="success"
          rounded
          raised
          :label="$t('inventory.form.saveButton')"
        >
        </Button>
      </div>
    </Form>
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
