<script setup lang="ts">
import type { PageState } from "primevue";
import type { GetListDebtResponse } from "~/interfaces/debt/response/get.list.debt.response";

const { debts, getDebts, loading } = useGetDebts();
const page = ref(0);
const sizePage = 100;

const debt_data = ref<GetListDebtResponse>();

const searchValue = ref("");
const showResume = ref(false);
function onShowResume(debt: GetListDebtResponse) {
  if (!debt) return;
  debt_data.value = debt;
  showResume.value = !showResume.value;
}

const filteredDebts = computed(() => {
  if (!debts?.value?.content) return [];
  if (!searchValue.value) return debts.value.content;

  const term = searchValue.value.toLowerCase();
  return debts.value.content.filter((debt) =>
    debt.client?.toLowerCase().includes(term)
  );
});

async function onNewPayment() {
  await getDebts(page.value, sizePage);
  showResume.value = false;
}

function onPageChange(event: PageState) {
  page.value = event.page;
}
onMounted(async () => {
  await getDebts(page.value, sizePage);
});
</script>
<template>
  <section class="debt">
    <article class="debt-header">
      <InputText
        id="in_label"
        fluid
        v-model="searchValue"
        variant="filled"
        :placeholder="$t('debtors.search')"
      />
    </article>
    <p v-if="!debts?.content && !loading" class="notFound">
      {{ $t("records.notFound") }}
    </p>
    <ProgressSpinner v-if="loading" animation-duration="0.7" stroke-width="5" />
    <article v-if="debts?.content != null" class="debt-clients">
      <DebtsUserCard
        v-for="debt in filteredDebts"
        :debt="debt"
        @search-debt="onShowResume"
      />
    </article>
    <article class="debt-footer">
      <Paginator
        v-if="debts?.totalElements"
        @page="onPageChange"
        :rows="sizePage"
        :totalRecords="debts?.totalElements"
      />
    </article>
  </section>
  <Dialog
    v-model:visible="showResume"
    modal
    maximizable
    :header="$t('debtors.modalTitle')"
    :style="{ width: '90vw', maxWidth: 'none' }"
  >
    <template #default>
      <DebtsPaymentsCollection :data="debt_data!" @created="onNewPayment" />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.debt {
  max-width: 1400px;
  margin: auto;

  .notFound {
    padding: 0 1rem;
  }
  &-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  &-clients {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    height: 80vh;
    overflow: hidden;
    scrollbar-width: none;
    overflow-y: auto;
    padding: 1rem;
    gap: 1rem;
  }
  &-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 400px) {
  .debt {
    &-clients {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 0.5rem;
    }
  }
}
</style>
