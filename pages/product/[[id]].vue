<script lang="ts" setup>
const route = useRoute();
const productId = route.params.id as string;
const { errorToast } = useCreateToast();
const { result, refreshProduct } = useGetProduct();
onMounted(async () => {
  if (!productId) return;
  await refreshProduct(productId);
  console.log(result);
  if (result.error) {
    errorToast("this is a error");
  }
});
</script>

<template>
  <section class="product">
    <article class="product-body">
      <inventory-new-product v-if="!result.product" />
      <inventory-update-product
        v-if="result.product"
        :product="result.product"
      />
    </article>
  </section>
</template>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  width: auto;
  align-items: center;
  border-radius: 1em;
  &-body {
    padding: 3em;
  }
}
@media (max-width: 1000px) {
  .product {
    &-body {
      padding: 1em;
    }
  }
}
@media (max-width: 500px) {
  .product {
    &-body {
      padding: 1em;
    }
  }
}
</style>
