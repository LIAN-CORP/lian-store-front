<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";

const show = ref(false);
function showForm() {
  show.value = !show.value;
}

const products = ref([
  {
    product: "Producto 1",
    quantity: 2,
    price: 50,
    total: 100,
  },
  {
    product: "Producto 2",
    quantity: 1,
    price: 200,
    total: 200,
  },
  {
    product: "Producto 3",
    quantity: 3,
    price: 30,
    total: 90,
  },
]);

const payments = ref([
  {
    payment: 1,
    method: "Efectivo",
    quantity: 100,
  },
  {
    payment: 2,
    method: "Tarjeta",
    quantity: 200,
  },
  {
    payment: 3,
    method: "Transferencia",
    quantity: 300,
  },
]);

defineProps<{}>();
</script>

<template>
  <section class="invoice">
    <article class="invoice-header">
      <BadgeDisplay label="Cliente:" value="Erick Enrique Chaparro Martinez" />
      <div class="invoice-separator">
        <BadgeDisplay label="Teléfono:" value="0000000000" />
        <BadgeDisplay label="Movimiento:" value="Deuda" />
      </div>
    </article>
    <article class="invoice-body">
      <DataTable
        :value="payments"
        scrollHeight="200px"
        :virtual-scroller-options="{
          itemSize: 5,
          lazy: true,
          showLoader: true,
        }"
        :rows="3"
      >
        <Column field="payment" header="#Pago" />
        <Column field="method" header="Método" />
        <Column field="quantity" header="Cantidad" />
      </DataTable>
      <div class="debt-badge-container">
        <BadgeDisplay
          label="Deuda:"
          value="390"
          backgroundColor="#172455"
          color="#ffffff"
          borderColor="#172455"
          withContainer
        />
        <Button severity="success" rounded @click="showForm">
          <template #icon>
            <Icon icon="majesticons:money-plus-line" width="24" height="24" />
          </template>
        </Button>
      </div>
      <FormNewPayment v-if="show == true" />
      <DataTable
        :value="products"
        scrollHeight="200px"
        :virtual-scroller-options="{
          itemSize: 5,
          lazy: true,
          showLoader: true,
        }"
        :rows="5"
      >
        <Column field="product" header="Producto" />
        <Column field="quantity" header="Cantidad" />
        <Column field="price" header="Precio Unitario" />
        <Column field="total" header="Total" />
      </DataTable>
      <div class="total-badge-container">
        <BadgeDisplay
          label="Total:"
          value="390"
          backgroundColor="#172455"
          color="#ffffff"
          borderColor="#172455"
          withContainer
        />
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.invoice {
  &-header {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    .invoice-separator {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
    }
  }
  &-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: right;
    margin-top: 2rem;
    .debt-badge-container {
      display: flex;
      justify-content: right;
      gap: 1rem;
    }
    .total-badge-container {
      display: flex;
      justify-content: right;
    }
  }
}
@media (width < 800px) {
  .invoice {
    &-header {
      flex-direction: column;
      gap: 0.5rem;
      .invoice-separator {
        flex-direction: column;
        gap: 0.5rem;
      }
      .invoice-group {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  }
}
</style>
