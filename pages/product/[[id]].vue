<script lang="ts" setup>
const route = useRoute();
const product = route.params.id;
onMounted(() => {});
</script>

<template>
  <section class="product">
    <article class="product-body">
      <inventory-new-product v-if="!product" />
      <inventory-update-product v-if="product" />
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
