<script lang="ts" setup>
const selectedItem = ref();
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
      v-model="selectedItem"
    ></Select>
    <div class="movements-content"></div>
  </section>
</template>

<style lang="scss" scoped>
.p-select {
  width: 100%;
}
.movements {
  padding: 1rem 3rem;
  &-content {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    background-color: rgb(255, 255, 255);
    border-radius: 1rem;
    width: 100%;
    height: 75vh;
    overflow-y: auto;
    box-shadow: 0px -4px 15px -3px rgba(0, 0, 0, 0.05),
      0px 5px 15px -3px rgba(0, 0, 0, 0.1);
  }
}

@media (width < 500px) {
  .movements {
    padding: 1rem;
  }
}
</style>
