<script lang="ts" setup>
import { formatPhone } from "#imports";
import type { GetTransaction } from "~/interfaces/transaction/response/get.transaction";

const { getDetails, loading, details } = useGetTransactionDetails();

const props = defineProps<{
  transaction?: GetTransaction;
}>();

const totalSum = computed(() => {
  if (details.value == null) {
    return 0;
  }
  return details.value.reduce((sum, product) => {
    return sum + product.unitPrice * product.quantity;
  }, 0);
});

onMounted(() => {
  getDetails(props.transaction?.id!);
});
</script>

<template>
  <section class="invoice">
    <article class="invoice-header">
      <div class="separator">
        <BadgeDisplay
          :label="$t('history.date')"
          :value="transaction?.transactionDate!"
        />

        <BadgeDisplay
          :label="$t('history.typeMovement')"
          :value="transaction?.typeMovement!"
        />
      </div>
      <div class="separator">
        <BadgeDisplay
          :label="$t('history.clientNameLabel')"
          :value="transaction?.client.name!"
        />
        <BadgeDisplay
          :label="$t('history.clientPhoneLabel')"
          :value="formatPhone(transaction?.client.phone!)"
        />
      </div>
    </article>
    <article class="invoice-body">
      <DataTable :value="details ?? []" :loading="loading">
        <Column field="product" :header="$t('history.table.product.product')" />
        <Column
          field="quantity"
          :header="$t('history.table.product.quantity')"
        />
        <Column
          field="unitPrice"
          :header="$t('history.table.product.unitPrice')"
        />
        <Column
          field="totalPrice"
          :header="$t('history.table.product.total')"
        />
      </DataTable>
      <div class="total-badge-container">
        <BadgeDisplay
          label="Total:"
          :value="`$${formatAmount(totalSum)}`"
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    .separator {
      display: grid;
      gap: 0.5em;
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
@media (max-width: 900px) {
  .invoice {
    &-header {
      flex-direction: column;
      gap: 0.5rem;
      .invoice-separator {
        gap: 0.5rem;
      }
    }
  }
}
@media (max-width: 400px) {
  .invoice-header {
    grid-template-columns: auto;
  }
}
</style>
