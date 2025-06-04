<script setup lang="ts">
import { Icon } from "@iconify/vue";
const emit = defineEmits(["deleteProduct", "editProduct"]);
import defaultImage from "@/assets/images/missing_product.webp";
function onDeleteProduct() {
  emit("deleteProduct");
}
function onEditProduct() {
  emit("editProduct");
}
defineProps<{
  id: number;
  name: string;
  image: string;
  category: string;
  subcategory: string;
  price: number;
  quantity: number;
}>();
</script>

<template>
  <article class="card">
    <div class="card-body">
      <div class="card-image">
        <img
          class="product-image"
          :src="image || defaultImage"
          alt="product-image"
        />
      </div>
      <div class="card-content">
        <dl>
          <dt>Producto:</dt>
          <dd>{{ name }}</dd>
          <dt>Categoria:</dt>
          <dd>{{ category }}</dd>
          <dt>Subcategoria:</dt>
          <dd>{{ subcategory }}</dd>
          <dt>Precio:</dt>
          <dd>${{ price }}</dd>
          <dt>Cantidad:</dt>
          <dd>{{ quantity }} u/c</dd>
        </dl>
      </div>
    </div>
    <div class="card-footer">
      <Button severity="info" raised rounded @click="onEditProduct">
        <template #icon>
          <Icon icon="grommet-icons:edit" width="1.5em" height="1.5em" />
        </template>
      </Button>
      <Button severity="danger" raised rounded @click="onDeleteProduct">
        <template #icon>
          <Icon
            icon="material-symbols:delete-rounded"
            width="1.5em"
            height="1.5em"
          />
        </template>
      </Button>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.card {
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0px 5px 14px 1px rgba(0, 0, 0, 0.25);
  &-body {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .card-image {
      display: grid;
      padding: 0.5rem;
      place-items: center;
      .product-image {
        max-height: 200px;
        width: 100%;
        object-fit: contain;
      }
    }
    .card-content {
      padding: 1rem 0.5rem;
      dl {
        max-width: 250px;
        dt {
          font-weight: 600;
        }
      }
    }
  }
  &-footer {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0.5rem;
  }
}
</style>
