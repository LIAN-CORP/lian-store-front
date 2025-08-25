<script lang="ts" setup>
defineProps<{
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
}>();
</script>

<template>
  <article class="item">
    <label class="item-checkbox-label">
      <Checkbox :input-id="id" />
    </label>
    <div class="item-container">
      <img class="item-image" :src="image" alt="product-image" />
      <div class="item-content">
        <p class="item-content-strong">{{ name }}</p>
        <p class="item-content-muted">{{ category }}</p>
        <p class="item-content-strong">${{ price }}</p>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.item {
  display: flex;
  max-width: 500px;
  height: 200px;
  border-radius: 0 5px 5px 0;
  border: 1px solid #c5c4c4;
  border-left: none;
  border-radius: 5px 0 0 5px;
  background-color: white;
  &-checkbox-label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem;
    background-color: #a3a5f3;
    border-radius: 5px 0 0 5px;
    cursor: pointer;
  }

  &-container {
    padding: 0.5rem;
    display: grid;
    grid-template-columns: 150px 1fr;
    width: 100%;
    place-items: center;
    gap: 0.5rem;
    .item-image {
      width: 150px;
      aspect-ratio: 1/1;
      object-fit: contain;
    }
    .item-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      justify-content: center;
      overflow-y: scroll;
      scrollbar-width: none;
      text-align: center;
      gap: 0.2rem;
      &-muted {
        color: #474747;
      }
      &-strong {
        font-weight: 600;
      }
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
