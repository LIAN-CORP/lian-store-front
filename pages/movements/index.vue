<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import { Dialog } from "primevue";
const payments = ref([
  {
    date: "2023-10-01",
    id: "123456",
    total: 100,
  },
  {
    date: "2023-10-02",
    id: "123457",
    total: 200,
  },
  {
    date: "2023-10-03",
    id: "123458",
    total: 300,
  },
]);
const detailsDialog = ref(false);
const selectedItem = ref();
const options = ref([
  { name: "Ventas" },
  { name: "Compras" },
  { name: "Deudas a cobrar" },
]);
function showDetails() {
  detailsDialog.value = true;
}
</script>

<template>
  <section class="movements">
    <article class="movements-header">
      <IftaLabel>
        <DatePicker fluid input-id="start_date" show-icon />
        <label for="start_date">Fecha Inicial</label>
      </IftaLabel>
      <IftaLabel>
        <DatePicker fluid input-id="end_date" show-icon />
        <label for="end_date">Fecha Final</label>
      </IftaLabel>
      <Button label="Buscar" severity="warn" />
    </article>
    <Select
      :options="options"
      option-label="name"
      placeholder="Seleccione el tipo de movimiento"
      v-model="selectedItem"
    ></Select>
    <div class="movements-content">
      <DataTable :value="payments" paginator :rows="9">
        <Column field="date" header="Fecha" />
        <Column field="id" header="Factura" />
        <Column field="total" header="Total" />
        <Column field="actions" header="Acciones">
          <template #body="{ data }">
            <Button variant="text" severity="info" @click="showDetails()">
              <template #icon>
                <Icon
                  icon="lets-icons:chat-search"
                  width="24"
                  height="24"
                  style="color: #172455"
                />
              </template>
            </Button>
          </template>
        </Column>
      </DataTable>
    </div>
  </section>
  <Dialog
    modal
    header=""
    :style="{ width: '90vw', maxWidth: 'none' }"
    v-model:visible="detailsDialog"
  >
    <template #default>
      <MovementsInvoiceDetails />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.p-select {
  width: 100%;
}
.movements {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
  &-header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  &-content {
    display: flex;
    flex-direction: column;
  }
}

@media (width < 800px) {
  .movements {
    padding: 1rem;
    &-header {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style>
