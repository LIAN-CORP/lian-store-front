<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import type { GetTransaction } from "~/interfaces/transaction/response/get.transaction";

const {} = useGetTransaction();

const props = defineProps<{
  transaction?: GetTransaction;
}>();

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
</script>

<template>
  <section class="invoice">
    <article class="invoice-header">
      <div class="invoice-separator">
        <BadgeDisplay
          :label="$t('history.clientNameLabel')"
          :value="transaction?.client.name!"
        />
        <BadgeDisplay
          :label="$t('history.clientPhoneLabel')"
          :value="transaction?.client.phone!"
        />
      </div>

      <div class="invoice-separator">
        <BadgeDisplay
          :label="$t('history.typeMovement')"
          :value="transaction?.typeMovement!"
        />
        <BadgeDisplay
          :label="$t('history.typeMovement')"
          :value="transaction?.transactionDate.toString()!"
        />
      </div>
    </article>
    <article class="invoice-body">
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
        <Column field="product" :header="$t('history.table.product.product')" />
        <Column
          field="quantity"
          :header="$t('history.table.product.quantity')"
        />
        <Column field="price" :header="$t('history.table.product.unitPrice')" />
        <Column field="total" :header="$t('history.table.product.total')" />
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
    flex-direction: column;
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
    .total-badge-container {
      display: flex;
      justify-content: right;
    }
  }
}
@media (width < 800px) {
  .invoice {
    &-header {
      gap: 0.5rem;
      .invoice-separator {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  }
}
</style>
