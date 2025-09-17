<script lang="ts" setup>
import { formatDate, formatPhone } from "#imports";
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
      <div class="invoice-separator">
        <BadgeDisplay
          :label="$t('history.clientNameLabel')"
          :value="transaction?.client.name!"
        />
        <BadgeDisplay
          :label="$t('history.clientPhoneLabel')"
          :value="formatPhone(transaction?.client.phone!)"
        />
      </div>

      <div class="invoice-separator">
        <BadgeDisplay
          :label="$t('history.typeMovement')"
          :value="transaction?.typeMovement!"
        />
        <BadgeDisplay
          :label="$t('history.typeMovement')"
          :value="formatDate(transaction?.transactionDate!)"
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
          :value="totalSum"
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
        gap: 0.5rem;
      }
    }
  }
}
@media (max-width: 600px) {
  .invoice-separator {
    gap: 0.5rem;
    flex-direction: column;
  }
}
</style>
