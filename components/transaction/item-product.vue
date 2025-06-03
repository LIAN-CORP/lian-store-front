<script lang="ts" setup>
defineProps<{
  image: string;
  name: string;
  category: string;
  price: number;
}>();
</script>

<template>
  <article class="item">
    <div class="item-container">
      <img class="item-container-image" :src="image" alt="product-image" />
    </div>
    <div class="item-content">
      <p class="item-content-strong">{{ name }}</p>
      <p class="item-content-muted">{{ category }}</p>
      <p class="item-content-strong">${{ price }}</p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  gap: 1rem;
  border-radius: 0 5px 5px 0;
  border: 1px solid #c5c4c4;
  border-left: none;
  padding: 0.5rem;
  &-container {
    display: grid;
    padding: 0.5rem;
    place-items: center;

    &-image {
      width: 150px;
      aspect-ratio: 1/1;
      object-fit: contain;
    }
  }
  &-content {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    max-width: 170px;
    &-muted {
      color: #474747;
    }
    &-strong {
      font-weight: 600;
    }
  }
}
@media (max-width: 800px) {
  .item {
    &-container {
      &-image {
        width: 80px;
      }
    }
    &-content {
      font-size: 0.7rem;
    }
  }
}
</style>
