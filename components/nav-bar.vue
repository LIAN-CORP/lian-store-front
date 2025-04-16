<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
const items = ref([
  {
    label: "Transacción",
    icon: "hugeicons:transaction",
  },
  {
    label: "Inventario",
    icon: "si:inventory-fill",
  },
  {
    label: "Deudores",
    icon: "lucide:book-user",
  },
  {
    label: "Informes",
    icon: "mdi:report-box",
  },
]);
</script>

<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <h1>Lian Corp</h1>
      </template>
      <template #itemicon="{ item }">
        <Icon :icon="item.icon!" width="1.5em" height="1.5em" />
      </template>
    </Menubar>
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: #ffffff;
  font-family: "LibreBarCode128";
  font-size: 3rem;
}
</style>
