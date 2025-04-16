<script setup lang="ts">
const toast = useToast();
function onSearchDebt() {}
</script>
<template>
  <div>
    <DebtUserCard name="Erick" :amount="10000000" @search-debt="onSearchDebt" />
  </div>
</template>
