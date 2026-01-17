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
    <DataView
      :value="filteredDebts"
      paginator
      data-key="id"
      :rows="sizePage"
      :total-records="debts?.totalElements"
      :first="page * sizePage"
      :loading="loading"
      @page="onPageChange"
    >
      <template #empty>
        <span class="empty-message"> {{ $t("records.notFound") }}</span>
      </template>
      <template #header>
        <InputText
          id="in_label"
          fluid
          v-model="searchValue"
          variant="outlined"
          :placeholder="$t('debtors.search')"
          style="background-color: #e4e6f1; text-align: center"
        />
      </template>
      <template #list="slotProps">
        <div class="cards">
          <DebtsUserCard
            v-for="debt in slotProps.items"
            :key="debt.id"
            :debt="debt"
            @search-debt="onShowResume"
          />
          <p v-if="!debts?.content && !loading" class="notFound">
            {{ $t("records.notFound") }}
          </p>
        </div>
      </template>
    </DataView>
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
  .empty-message {
    padding: 0 1em;
    text-align: center;
  }
  box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
  max-width: 1400px;
  margin: auto;
  height: 100%;
  background-color: #e4e6f1;
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 200px;
    height: 70dvh;
    overflow-y: auto;
    scrollbar-width: none;
    padding: 2em;
    column-gap: 1em;
    row-gap: 3em;
  }
}
@media (min-width: 1200px) {
  .debt {
    margin: 2em auto;
  }
}

@media (max-width: 400px) {
  .debt {
    &-clients {
      gap: 0.5rem;
    }
  }
}
</style>
