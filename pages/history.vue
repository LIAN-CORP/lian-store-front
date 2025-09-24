<script lang="ts" setup>
import type { PageState } from "primevue";
import { TRANSACTION_TYPE } from "../constants/transaction.constant";
import type { GetTransaction } from "~/interfaces/transaction/response/get.transaction";
import { formatDate, toLocalISODate } from "#imports";

const { onConfirmDelete } = useConfirmDialog();
const { onGenerateReport } = useGetResumeFile();
const { t } = useI18n();
const { loading: deleteLoading, onDeleteTransaction } = useDeleteTransaction();
const { getTransactions, loading, transactions } = useGetTransaction();

const detailsDialog = ref(false);
const selectedType = ref<string | null>(null);
const selectedTransaction = ref<GetTransaction | null>(null);
const rangeDate = ref<Date[] | null>();
const page = ref<number>(0);
const size = 10;

const canGenerate = computed(() => {
  return (
    rangeDate.value?.length === 2 &&
    rangeDate.value[0] !== null &&
    rangeDate.value[1] !== null
  );
});

watch(rangeDate, async (range) => {
  if (!canGenerate.value) return;
  page.value = 0;
  const start = toLocalISODate(range![0]);
  const end = toLocalISODate(range![1]);
  await getTransactions(page.value, size, start!, end!);
});

async function onGenerate() {
  if (!canGenerate.value) return;
  const start = toLocalISODate(rangeDate.value![0]);
  const end = toLocalISODate(rangeDate.value![1]);
  await onGenerateReport(start!, end!);
}

async function onPageChange(e: PageState) {
  page.value = e.page;
  getTransactions(page.value, size);
}
function onDelete(id: string) {
  onConfirmDelete({
    message: t("confirm.delete.transaction.message", { id: id }),
    async onAccept() {
      await onDeleteTransaction(id);
      await getTransactions(page.value, size);
    },
  });
}

function showDetails(details: GetTransaction) {
  selectedTransaction.value = details;
  detailsDialog.value = true;
}
onMounted(async () => {
  getTransactions(page.value, size);
});
</script>

<template>
  <ConfirmDialog />
  <LoadingScreen :state="deleteLoading" />
  <section class="movements">
    <article class="movements-header">
      <InputGroup class="group">
        <IftaLabel>
          <DatePicker
            :manualInput="false"
            input-id="start_date"
            v-model="rangeDate"
            dateFormat="dd/mm/yy"
            selection-mode="range"
          />
          <label for="start_date">{{ $t("history.dateRange") }}</label>
        </IftaLabel>
        <InputGroupAddon>
          <IconButton
            severity="secondary"
            icon="material-symbols:close"
            icon-color="gray"
            icon-size="1.2em"
            style="height: 100%"
            :disabled="!canGenerate"
            @click="
              rangeDate = null;
              getTransactions(page, size);
            "
          />
        </InputGroupAddon>
      </InputGroup>
      <Button
        :label="$t('button.save')"
        :disabled="!canGenerate"
        severity="warn"
        @click="onGenerate"
      />
    </article>
    <Select
      show-clear
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
        :total-records="transactions?.totalElements ?? 0"
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
        <Column
          field="client.name"
          :header="$t('history.table.resume.client')"
        />
        <Column field="id" :header="$t('history.table.resume.invoice')" />
        <Column
          field="typeMovement"
          :header="$t('history.table.resume.type')"
        />
        <Column field="actions" :header="$t('history.table.resume.actions')">
          <template #body="{ data }">
            <IconButton
              variant="text"
              severity="info"
              @click="showDetails(data)"
              icon="lets-icons:chat-search"
              icon-color="#172455"
            />
            <IconButton
              variant="text"
              severity="danger"
              @click="onDelete(data.id)"
              icon="material-symbols:close"
              icon-color="#EF4444"
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
      <HistoryInvoiceDetails :transaction="selectedTransaction!" />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.group {
  max-width: 500px;
}
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

@media (max-width: 800px) {
  .group {
    max-width: 100%;
  }
  .movements {
    padding: 1rem;
    &-header {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style>
