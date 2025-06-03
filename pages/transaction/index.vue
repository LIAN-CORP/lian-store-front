<script lang="ts" setup>
const select = ref(false);
const selectedProducts = ref([
  {
    id: 1,
    product: "producto1",
    price: 100,
    quantity: 0,
  },
]);
function onShowSelect() {
  select.value = !select.value;
}
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
        @click="onShowSelect"
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
        class="transaction-footer-badge"
        label="Total:"
        value="390"
        color="#000000"
        withContainer
        radius="10px"
      />
    </div>
    <article class="transaction-footer">
      <Button label="crear" severity="success" />
    </article>
  </section>
  <Dialog v-model:visible="select" modal>
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
  }
  &-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    &-badge {
      width: 100%;
    }
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
