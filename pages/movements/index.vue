<script lang="ts" setup>
const selectedCity = ref();
const options = ref([
  { name: "Ventas" },
  { name: "Compras" },
  { name: "Deudas a cobrar" },
]);
</script>

<template>
  <section class="movements">
    <Select
      :options="options"
      option-label="name"
      placeholder="Seleccione el tipo de movimiento"
    ></Select>
  </section>
</template>

<style lang="scss" scoped>
.p-select {
  width: 100%;
}
.movements {
  padding: 1rem 4rem;
}
</style>
