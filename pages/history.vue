<script lang="ts" setup>
import type { PageState } from "primevue";
import { TRANSACTION_TYPE } from "../constants/transaction.constant";
const { t } = useI18n();
const detailsDialog = ref(false);

const selectedType = ref<string | null>(null);
const rangeDate = ref<Date[] | null>();
const page = ref<number>(0);
const size = 10;

function toLocalISODate(date: Date | null) {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const { getTransactions, loading, transactions, formatDate } =
  useGetTransaction();
const options = ref([
  { label: t("history.select.sales"), value: "sales" },
  { label: t("history.select.purchases"), value: "purchases" },
  { label: t("history.select.debts"), value: "debts" },
]);

watch(rangeDate, async (range) => {
  console.log(range);
  if (!range || range.length < 2) return;
  page.value = 0;
  const start = toLocalISODate(range[0]);
  const end = toLocalISODate(range[1]);

  await getTransactions(page.value, size, start!, end!);
});

async function onPageChange(e: PageState) {
  page.value = e.page;
  getTransactions(page.value, size);
}

function showDetails() {
  detailsDialog.value = true;
}
onMounted(async () => {
  getTransactions(page.value, size);
});
</script>

<template>
  <section class="movements">
    <article class="movements-header">
      <IftaLabel>
        <DatePicker
          fluid
          input-id="start_date"
          v-model="rangeDate"
          dateFormat="dd/mm/yy"
          selection-mode="range"
        />
        <label for="start_date">{{ $t("history.dateRange") }}</label>
      </IftaLabel>
      <Button :label="$t('button.save')" severity="warn" />
    </article>
    <Select
      :options="TRANSACTION_TYPE"
      :optionLabel="(option) => $t(option.name)"
      option-value="code"
      :placeholder="$t('history.selectPlaceholder')"
      v-model="selectedType"
    ></Select>
    <div class="movements-content">
      <DataTable
        data-key="id"
        lazy
        paginator
        :value="transactions?.content ?? []"
        :loading="loading"
        :rows="size"
        :total-records="transactions?.totalPage ?? 0"
        @page="onPageChange"
      >
        <Column
          field="transactionDate"
          :header="$t('history.table.resume.date')"
        >
          <template #body="{ data }">
            {{ formatDate(data.transactionDate) }}
          </template>
        </Column>
        <Column field="id" :header="$t('history.table.resume.invoice')" />
        <Column
          field="typeMovement"
          :header="$t('history.table.resume.type')"
        />
        <Column field="actions" :header="$t('history.table.resume.actions')">
          <template #body>
            <IconButton
              variant="text"
              severity="info"
              @click="showDetails()"
              icon="lets-icons:chat-search"
              icon-color="#172455"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
  <Dialog
    modal
    :header="$t('history.modalTitle')"
    :style="{ width: '90vw', maxWidth: 'none' }"
    v-model:visible="detailsDialog"
  >
    <template #default>
      <HistoryInvoiceDetails />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.p-select {
  width: 100%;
}
.movements {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
  &-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  &-content {
    display: flex;
    flex-direction: column;
  }
}

@media (width < 800px) {
  .movements {
    padding: 1rem;
    &-header {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style>
