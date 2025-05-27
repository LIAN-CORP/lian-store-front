<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";

const debts = ref([
  {
    date: "2023-10-01",
    invoice: "Factura 1",
    total: 100,
  },
  {
    date: "2023-10-02",
    invoice: "Factura 2",
    total: 200,
  },
  {
    date: "2023-10-03",
    invoice: "Factura 3",
    total: 300,
  },
  {
    date: "2023-10-04",
    invoice: "Factura 4",
    total: 400,
  },
  {
    date: "2023-10-05",
    invoice: "Factura 5",
    total: 500,
  },
]);
function redirect() {
  console.log("Redirecting to details...");
}
</script>

<template>
  <article class="resume">
    <DataTable
      :value="debts"
      scrollHeight="300px"
      :virtual-scroller-options="{
        itemSize: 4,
        lazy: true,
        showLoader: true,
      }"
      :rows="4"
    >
      <Column field="date" header="Fecha" />
      <Column field="invoice" header="Factura" />
      <Column field="total" header="Total" />
      <Column field="actions" header="Acciones">
        <template #body="{ data }">
          <Button variant="text" severity="info" @click="redirect()">
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
    <div class="resume-badge">
      <BadgeDisplay
        label="Total:"
        value="390"
        backgroundColor="#172455"
        color="#ffffff"
        borderColor="#172455"
        withContainer
      />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.resume {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  &-badge {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
}
</style>
