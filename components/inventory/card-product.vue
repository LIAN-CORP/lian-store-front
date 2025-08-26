<script setup lang="ts">
import { Icon } from "@iconify/vue";
const emit = defineEmits(["deleteProduct", "editProduct"]);
import defaultImage from "@/assets/images/missing_product.webp";
const props = defineProps<{
  id: string;
  name: string;
  image: string;
  category: string;
  subcategory: string;
  price: number;
  quantity: number;
}>();
function onDeleteProduct() {
  emit("deleteProduct", props.id, props.name);
}
function onEditProduct() {
  emit("editProduct", props.id);
}
</script>

<template>
  <section class="card">
    <div class="card-body">
      <div class="card-buttons">
        <Button severity="info" raised @click="onEditProduct">
          <template #icon>
            <Icon icon="grommet-icons:edit" width="1.5em" height="1.5em" />
          </template>
        </Button>
        <Button severity="danger" raised @click="onDeleteProduct">
          <template #icon>
            <Icon
              icon="material-symbols:delete-rounded"
              width="1.5em"
              height="1.5em"
            />
          </template>
        </Button>
      </div>
      <article class="card-image">
        <img
          class="product-image"
          :src="image || defaultImage"
          alt="product-image"
        />
      </article>
      <div class="card-content">
        <div class="card-content-inventory">
          <span>${{ price }}</span>
          <span>{{ quantity }} u/c</span>
        </div>
        <p>
          <b>{{ $t("inventory.labels.name") }}:</b>
          {{ name }}
        </p>
        <p>
          <b>{{ $t("inventory.labels.category") }}:</b>
          {{ category }}
        </p>
        <p>
          <b>{{ $t("inventory.labels.subcategory") }}:</b>
          {{ subcategory }}
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.card {
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0px 5px 14px 1px rgba(0, 0, 0, 0.25);
  position: relative;
  height: 350px;
  &-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    .card-image {
      display: flex;
      justify-content: center;
      .product-image {
        width: 170px;
        object-fit: contain;
        aspect-ratio: 1/1;
      }
    }
    .card-buttons {
      display: flex;
      flex-direction: column;
      position: absolute;
      gap: 0.2em;
      right: 5px;
      top: 5px;
    }
    .card-content {
      overflow: auto;
      scrollbar-width: none;
      width: 100%;
      &-inventory {
        display: flex;
        justify-content: space-between;
        span {
          color: #0284c7;
          //color: #437bc5;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
