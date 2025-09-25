<script lang="ts" setup>
import type { GetListDebtResponse } from "~/interfaces/debt/response/get.list.debt.response";

const props = defineProps<{
  data: GetListDebtResponse;
}>();

const emit = defineEmits(["created"]);
function onCreated() {
  emit("created");
}

const { getPayment, loading, payments } = useGetClientPayments();
onMounted(() => {
  getPayment(props.data.id);
});
</script>

<template>
  <article class="resume">
    <DataTable :value="payments" :loading="loading" :rows="5" paginator>
      <Column field="paymentDate" :header="$t('debtors.detailsTable.date')">
        <template #body="slotProps">
          {{ formatDateTime(slotProps.data.paymentDate) }}
        </template>
      </Column>
      <Column field="id" :header="$t('debtors.detailsTable.payment')" />
      <Column field="amount" :header="$t('debtors.detailsTable.amount')">
        <template #body="{ data }">
          {{ `$${formatAmount(data.amount)}` }}
        </template>
      </Column>
      <Column
        field="paymentMethod"
        :header="$t('debtors.detailsTable.method')"
      />
    </DataTable>

    <DebtsNewPayment
      :client-id="data.clientId"
      :transaction-id="data.transactionId"
      :debt-id="data.id"
      :amount="data.remainingAmount"
      @created="onCreated"
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
