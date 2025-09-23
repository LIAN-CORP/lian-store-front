<script lang="ts" setup>
import type { GetListDebtResponse } from "~/interfaces/debt/response/get.list.debt.response";

const props = defineProps<{
  data: GetListDebtResponse;
}>();

const { getPayment, loading, payments } = useGetClientPayments();
onMounted(() => {
  getPayment(props.data.id);
});
</script>

<template>
  <article class="resume">
    <DataTable :value="payments" :loading="loading">
      <Column field="id" :header="$t('debtors.detailsTable.total')" />
      <Column field="paymentDate" :header="$t('debtors.detailsTable.date')" />
      <Column
        field="paymentMethod"
        :header="$t('debtors.detailsTable.invoice')"
      />
      <Column field="amount" :header="$t('debtors.detailsTable.total')" />
      <Column field="clientId" :header="$t('debtors.detailsTable.total')" />
    </DataTable>

    <DebtsNewPayment
      :client-id="data.clientId"
      :transaction-id="data.transactionId"
      :debt-id="data.id"
      :amount="data.remainingAmount"
      @created="async () => await getPayment(data.id)"
    />
  </article>
</template>

<style lang="scss" scoped>
.resume {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}
</style>
