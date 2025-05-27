<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
const searchValue = ref("");
const showResume = ref(false);
function onShowResume() {
  showResume.value = !showResume.value;
}
function onSearch() {
  console.log("New debt");
}

function onSearchDebt() {}
</script>
<template>
  <section class="debt">
    <article class="debt-header">
      <InputGroup>
        <InputText
          id="in_label"
          v-model="searchValue"
          variant="filled"
          placeholder="Buscar producto"
        />
        <Button severity="info" @click="onSearch">
          <template #icon>
            <Icon icon="grommet-icons:search" width="1.5em" height="1.5em" />
          </template>
        </Button>
      </InputGroup>
    </article>
    <article class="debt-clients">
      <DebtUserCard name="Erick" :amount="100" @search-debt="onShowResume" />
    </article>
    <article class="debt-footer">
      <Paginator
        :rows="10"
        :totalRecords="120"
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Mostrado {first} a {last} de {totalRecords}"
      />
    </article>
  </section>
  <Dialog
    v-model:visible="showResume"
    modal
    maximizable
    header="Deudas"
    :style="{ width: '90vw', maxWidth: 'none' }"
  >
    <template #default>
      <DebtResume />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
.debt {
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
