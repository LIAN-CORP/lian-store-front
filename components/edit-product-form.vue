<script lang="ts" setup>
import type { FormSubmitEvent } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import {
  ProductEditScheme,
  type ProductEditData,
} from "~/schemas/product.edit.scheme";

const resolver = ref(zodResolver(ProductEditScheme));

const productData = ref<ProductEditData>({
  price: 0,
  stock: 0,
});

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
    ><div>
      <FloatLabel variant="on">
        <InputNumber
          inputId="priceID"
          name="price"
          fluid
          v-model="productData.price"
        />
        <label for="priceID">Precio</label>
      </FloatLabel>
      <Message v-if="$form.price?.invalid" severity="error">{{
        $form.price.error?.message
      }}</Message>
    </div>
    <div>
      <FloatLabel variant="on">
        <InputNumber
          inputId="stockID"
          name="stock"
          fluid
          v-model="productData.stock"
        />
        <label for="stockID">Cantidad</label>
      </FloatLabel>
      <Message v-if="$form.stock?.invalid" severity="error">{{
        $form.stock.error?.message
      }}</Message>
    </div>
    <Button type="submit" label="Guardar" />
  </Form>
</template>

<style lang="scss" scoped>
.product-edit {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
}
</style>
