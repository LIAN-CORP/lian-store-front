<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";

const products = ref([
  {
    id: 1,
    name: "Producto 1 esto es un texto de prueba para ver el comportamiendo del componente",
    image:
      "https://supermercadolaestacion.com/50709-large_default/arroz-diana-x-500-gramos.jpg",
    category: "Categoria 1",
    price: 100,
  },
  {
    id: 2,
    name: "Producto 2 con una descripción algo larga para probar el truncamiento de texto",
    image:
      "https://supermercadolaestacion.com/50709-large_default/arroz-diana-x-500-gramos.jpg",
    category: "Categoria 2",
    price: 150,
  },
  {
    id: 3,
    name: "Producto 3 una prueba adicional para verificar comportamiento visual",
    image:
      "https://supermercadolaestacion.com/50709-large_default/arroz-diana-x-500-gramos.jpg",
    category: "Categoria 3",
    price: 120,
  },
  {
    id: 4,
    name: "Producto 4 ",
    image:
      "https://supermercadolaestacion.com/50709-large_default/arroz-diana-x-500-gramos.jpg",
    category: "Categoria 4",
    price: 200,
  },
  {
    id: 5,
    name: "Producto 5 ejemplo de un nombre largo para el componente de tarjeta de producto",
    image:
      "https://supermercadolaestacion.com/50709-large_default/arroz-diana-x-500-gramos.jpg",
    category: "Categoria 5",
    price: 90,
  },
  {
    id: 6,
    name: "Producto 6",
    image:
      "https://supermercadolaestacion.com/50709-large_default/arroz-diana-x-500-gramos.jpg",
    category: "Categoria 6",
    price: 110,
  },
]);
const selectedProduct = ref([]);
const searchValue = ref();
function showSearch() {}
function onProductChange() {
  console.log(selectedProduct.value);
}
</script>

<template>
  <section class="select">
    <div class="select-header">
      <InputGroup>
        <InputText
          id="in_label"
          v-model="searchValue"
          variant="filled"
          placeholder="Buscar producto"
        />
        <Button severity="info" @click="showSearch">
          <template #icon>
            <Icon icon="grommet-icons:search" width="1em" height="1em" />
          </template>
        </Button>
      </InputGroup>
    </div>
    <div class="select-content">
      <DataView :value="products" data-key="id" class="algo">
        <template #list="data">
          <section class="cards-container">
            <article
              v-for="product in products"
              class="product-card"
              :key="product.id"
              @change="onProductChange"
            >
              <label class="product-card-label">
                <Checkbox
                  v-model="selectedProduct"
                  :input-id="product.id + '-checkbox'"
                  :value="product"
                />
              </label>
              <TransactionItemProduct
                :name="product.name"
                :image="product.image"
                :category="product.category"
                :price="product.price"
              />
            </article>
          </section>
        </template>
      </DataView>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.select {
  background-color: #eef2ff;

  &-header {
    padding: 1rem;
  }
  &-content {
    .cards-container {
      display: grid;
      padding: 1rem;
      gap: 1rem;
      background-color: #eef2ff;
      height: 500px;
      overflow-y: auto;
      scrollbar-width: 2px;
      box-shadow: inset 0px 0px 17px 0px rgba(0, 0, 0, 0.12);

      .product-card {
        display: flex;
        height: 100%;
        &-label {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.3rem;
          border-radius: 5px 0 0 5px;
          background-color: #a3a5f3;
          cursor: pointer;
        }
        &-label:hover {
          background-color: #8486e5;
        }
      }
    }
  }
}
@media (max-width: 800px) {
  .select {
    &-header {
      padding: 0.5rem;
    }
    &-content {
      .cards-container {
        padding: 0.2rem;
        gap: 1rem;
        height: 300px;
      }
    }
  }
}
</style>
