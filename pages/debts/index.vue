<script setup lang="ts">
const toast = useToast();
function onSearchDebt() {}
</script>
<template>
  <section class="debts-container">
    <DebtUserCard name="Erick" :amount="10000000" @search-debt="onSearchDebt" />
    <DebtUserCard name="Erick" :amount="10000000" @search-debt="onSearchDebt" />
    <DebtUserCard name="Erick" :amount="10000000" @search-debt="onSearchDebt" />
    <DebtUserCard name="Erick" :amount="10000000" @search-debt="onSearchDebt" />
    <DebtUserCard name="Erick" :amount="10000000" @search-debt="onSearchDebt" />
  </section>
</template>
<style scoped lang="scss">
.debts-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 1rem;
  gap: 1rem;
}
@media (max-width: 768px) {
  .debts-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0.5rem;
  }
}
</style>
