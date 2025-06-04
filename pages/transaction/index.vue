<script lang="ts" setup>
const selectComponent = ref(false);
function onShowSelectComponent() {
  selectComponent.value = !selectComponent.value;
}
const selectedProducts = ref([
  {
    id: 1,
    product: "producto1",
    price: 100,
    quantity: 0,
  },
]);

function onCellEditComplete(event: any) {
  const { data, field, newValue } = event;
  data[field] = newValue;
}
</script>

<template>
  <section class="transaction">
    <article class="transaction-header">
      <Button
        label="agregar producto"
        @click="onShowSelectComponent"
        severity="success"
      />
      <Select placeholder="Tipo de Movimiento" />
    </article>

    <article class="transaction-body">
      <DataTable
        :value="selectedProducts"
        data-key="id"
        edit-mode="cell"
        @cell-edit-complete="onCellEditComplete"
      >
        <Column field="product" header="Producto" />
        <Column field="quantity" header="Cantidad">
          <template #editor="{ data, field }">
            <InputNumber
              v-model="data[field]"
              showButtons
              :min="0"
              button-layout="horizontal"
              size="small"
            />
          </template>
        </Column>
        <Column field="price" header="Precio" />
        <Column field="total" header="Total" />
      </DataTable>
    </article>
    <div class="separator">
      <Select placeholder="Tipo de pago" fluid />
      <BadgeDisplay
        class="separator-badge"
        label="Total:"
        value="390"
        color="#000000"
        withContainer
        radius="10px"
      />
    </div>
    <div class="transaction-debtor">
      <Select placeholder="deudor" fluid />
      <Button label="+" />
    </div>
    <DebtsNewDebtor input-color="#FFFFFF" />
  </section>
  <Dialog v-model:visible="selectComponent" modal>
    <template #default>
      <TransactionSelectProduct />
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.transaction {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem;
  gap: 1rem;
  border-radius: 10px;
  box-shadow: inset 0px 0px 17px 0px rgba(0, 0, 0, 0.12);
  &-header {
    display: flex;
    gap: 1rem;
  }
  &-body {
    ::v-deep(.p-inputnumber) {
      .p-inputnumber-input {
        width: 50px;
        height: 25px;
      }
    }
  }
  .separator {
    display: flex;
    align-items: center;
    gap: 1rem;
    &-badge {
      width: 100%;
    }
  }
  &-debtor {
    display: flex;
    align-content: center;
    justify-content: center;
    gap: 1rem;
  }
}
@media (max-width: 500px) {
  .transaction {
    padding: 0.5rem;
    margin: 0.5rem;
    &-header {
      flex-direction: column;
    }
    .separator {
      flex-direction: column-reverse;
    }
  }
}
</style>
