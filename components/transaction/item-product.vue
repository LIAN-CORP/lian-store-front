<script lang="ts" setup>
const { cart, transactionType } = useCartState();

const props = defineProps<{
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  priceBuy: number;
  stock: number;
}>();
function toggleCart() {
  const exists = cart.value.find((item) => item.id === props.id);
  if (exists) {
    cart.value = cart.value.filter((item) => item.id !== props.id);
  } else {
    cart.value.push({
      id: props.id,
      product: props.name,
      price: props.price,
      priceBuy: props.priceBuy,
      quantity: 1,
      stock: props.stock,
    });
  }
}
</script>

<template>
  <article class="item">
    <label class="item-checkbox-label">
      <Checkbox
        :input-id="id"
        :value="id"
        :model-value="cart.map((item) => item.id)"
        :disabled="transactionType != 'COMPRA' && stock == 0"
        @change="toggleCart"
      />
    </label>
    <div class="item-container">
      <img class="item-image" :src="image" alt="product-image" />
      <div class="item-content">
        <p class="item-content-muted">{{ name }}</p>
        <p class="item-content-muted">{{ category }}</p>
        <p class="item-content-strong buy">
          ${{ formatAmount(priceBuy ?? 0) }}
        </p>
        <p class="item-content-strong sell">${{ formatAmount(price ?? 0) }}</p>

        <p class="item-content-strong">{{ stock }}u/c</p>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.item-checkbox-label:has(.p-checkbox.p-disabled) {
  pointer-events: none;
  cursor: not-allowed;
  background-color: #8182b1;
}
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
  .buy {
    color: #ef4444;
  }
  .sell {
    color: #22c55e;
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
        font-weight: 600;
        color: #747474;
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
      grid-template-columns: 100px 1fr;
      .item-image {
        width: 100px;
      }
    }
    &-content {
      font-size: 0.7rem;
    }
  }
}
@media (max-width: 400px) {
  .item {
    &-container {
      grid-template-columns: 80px 1fr;
      .item-image {
        width: 80px;
      }
    }
  }
}
</style>
