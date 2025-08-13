<script lang="ts" setup>
const route = useRoute();
const productId = route.params.id as string;
const { result, refreshProduct } = useGetProduct();
onMounted(async () => {
  if (!productId) return;
  await refreshProduct(productId);
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
  justify-content: center;
  padding: 2rem;
}
@media (max-width: 800px) {
  .product {
    display: block;
    padding: 1rem;
  }
}
@media (max-width: 400px) {
  .product {
    display: block;
    padding: 0.5rem;
  }
}
</style>
