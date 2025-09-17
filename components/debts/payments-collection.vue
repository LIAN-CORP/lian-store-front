<script lang="ts" setup>
const props = defineProps<{
  client: string;
}>();

const { GetPayment, loading, payments } = useGetClientPayments();
onMounted(() => {
  GetPayment(props.client);
});
</script>

<template>
  <!--   <DebtsNewPayment :client-id="client"/> -->
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
