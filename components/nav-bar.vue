<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const router = useRouter();

const items = ref([
  {
    label: "Transacción",
    icon: "hugeicons:transaction",
    command: () => {
      router.push("/transaction");
    },
  },
  {
    label: "Inventario",
    icon: "si:inventory-fill",
    command: () => {
      router.push("/inventory");
    },
  },
  {
    label: "Deudores",
    icon: "lucide:book-user",
    command: () => {
      router.push("/debts");
    },
  },
  {
    label: "Movimientos",
    icon: "mdi:report-box",
    command: () => {
      router.push("/movements");
    },
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
