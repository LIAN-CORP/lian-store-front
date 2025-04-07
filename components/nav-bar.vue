<script setup lang="ts">
import { ref } from "vue";

const items = ref([
  {
    label: "Transacción",
    icon: "pi pi-home",
  },
  {
    label: "Inventario",
    icon: "pi pi-star",
  },
  {
    label: "Deudores",
    icon: "pi pi-search",
  },
  {
    label: "Informes",
    icon: "pi pi-envelope",
  },
]);
</script>

<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <h1>Lian Corp</h1>
      </template>
    </Menubar>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  color: #ffffff;
  font-family: "LibreBarCode128";
  font-size: 3rem;
}
</style>
