<script setup lang="ts">
import type { PageState } from "primevue";

const { debts, loading, getDebts } = useGetDebts();
const page = ref(0);
const sizePage = 20;

const searchValue = ref("");
const showResume = ref(false);
function onShowResume() {
  showResume.value = !showResume.value;
}
function onSearch() {
  console.log("New debt");
}

function onPageChange(event: PageState) {
  page.value = event.page;
}

function onSearchDebt() {}
onMounted(() => {
  getDebts(page.value, sizePage);
});
</script>
<template>
  <section class="debt">
    <article class="debt-header">
      <InputGroup>
        <InputText
          id="in_label"
          v-model="searchValue"
          variant="filled"
          :placeholder="$t('debtors.search')"
        />
        <IconButton
          severity="info"
          icon="grommet-icons:search"
          @click="onSearch"
        />
      </InputGroup>
    </article>
    <p v-if="!debts?.content" class="notFound">
      {{ $t("records.notFound") }}
    </p>
    <article v-if="debts?.content != null" class="debt-clients">
      <DebtsUserCard
        v-for="debtor in debts?.content"
        :name="debtor.client"
        :amount="debtor.remainingAmount"
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
      <DebtsInvoiceCollection />
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
