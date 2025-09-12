<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
const { t } = useI18n();
const detailsDialog = ref(false);
const selectedItem = ref();
const options = ref([
  { label: t("movements.select.sales"), value: "sales" },
  { label: t("movements.select.purchases"), value: "purchases" },
  { label: t("movements.select.debts"), value: "debts" },
]);
const payments = ref([
  {
    date: "2023-10-01",
    id: "123456",
    total: 100,
  },
  {
    date: "2023-10-02",
    id: "123457",
    total: 200,
  },
  {
    date: "2023-10-03",
    id: "123458",
    total: 300,
  },
]);

function showDetails() {
  detailsDialog.value = true;
}
</script>

<template>
  <section class="movements">
    <article class="movements-header">
      <IftaLabel>
        <DatePicker fluid input-id="start_date" show-icon />
        <label for="start_date">{{ $t("movements.startDate") }}</label>
      </IftaLabel>
      <IftaLabel>
        <DatePicker fluid input-id="end_date" show-icon />
        <label for="end_date">{{ $t("movements.endDate") }}</label>
      </IftaLabel>
      <Button :label="$t('button.save')" severity="warn" />
    </article>
    <Select
      :options="options"
      option-label="label"
      option-value="value"
      :placeholder="$t('movements.selectPlaceholder')"
      v-model="selectedItem"
    ></Select>
    <div class="movements-content">
      <DataTable :value="payments" paginator :rows="9">
        <Column field="date" :header="$t('movements.table.resume.date')" />
        <Column field="id" :header="$t('movements.table.resume.invoice')" />
        <Column field="total" :header="$t('movements.table.resume.total')" />
        <Column field="actions" :header="$t('movements.table.resume.actions')">
          <template #body="{ data }">
            <Button variant="text" severity="info" @click="showDetails()">
              <template #icon>
                <Icon
                  icon="lets-icons:chat-search"
                  width="24"
                  height="24"
                  style="color: #172455"
                />
              </template>
            </Button>
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
  <Dialog
    modal
    :header="$t('movements.modalTitle')"
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
