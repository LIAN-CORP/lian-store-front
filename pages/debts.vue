<script setup lang="ts">
import type { PageState } from "primevue";

const { debts, getDebts, loading } = useGetDebts();
const page = ref(0);
const sizePage = 20;

const client = ref<string>();

const searchValue = ref("");
const showResume = ref(false);
function onShowResume(id: string) {
  if (!id) return;
  client.value = id;
  showResume.value = !showResume.value;
}

function onPageChange(event: PageState) {
  page.value = event.page;
}
onMounted(() => {
  getDebts(page.value, sizePage);
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
    <p v-if="!debts?.content" class="notFound">
      {{ $t("records.notFound") }}
    </p>
    <ProgressSpinner v-if="loading" animation-duration="0.7" stroke-width="5" />
    <article v-if="debts?.content != null" class="debt-clients">
      <DebtsUserCard
        v-for="debt in debts?.content"
        :debt="debt.id"
        :client="debt.clientId"
        :name="debt.client"
        :amount="debt.remainingAmount"
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
      <DebtsPaymentsCollection :client="client!" />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.debt {
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
