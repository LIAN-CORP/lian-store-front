<script lang="ts" setup>
import { useTransactionTypes, useTransactionPaymentTypes } from '~/constants/transaction.constant';

const {typeTransaction} = useTransactionTypes();
const {typePayment} = useTransactionPaymentTypes();

const selectComponent = ref(false);
const selectAddDebtor = ref(false);


const selectedProducts = ref([]);


function onCellEditComplete(event: any) {
  const { data, field, newValue } = event;
  data[field] = newValue;
}

function onSelectedProducts(productos: any[]) {
  selectedProducts.value = productos.map(p => ({
    id: p.id,
    product: p.name,
    price: p.priceSell,
    quantity: 1,
  }));
}

const totalSum = computed(() => {
  return selectedProducts.value.reduce((sum, product) => {
    return sum + (product.price * product.quantity)
  }, 0)
})

</script>

<template>
  <section class="transaction">
    <article class="transaction-header">
      <div class="actions">
        <Button
          :label="$t('transaction.addProduct')"
          @click="selectComponent = true"
          severity="success"
        />
        <Select editable :options="typeTransaction" optionLabel="name" optionValue="code" :placeholder="$t('transaction.typeMovementPlaceholder')" />
      </div>
      <div>
        <Button 
          :label="$t('transaction.submit')"
          @click=""
          severity="success"
          />
      </div>
    </article>

    <article class="transaction-body">
      <DataTable
        :value="selectedProducts"
        data-key="id"
        edit-mode="cell"
        @cell-edit-complete="onCellEditComplete"
      >
        <Column field="product" :header="$t('transaction.table.product')" />
        <Column field="quantity" :header="$t('transaction.table.quantity')">
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
        <Column field="price" :header="$t('transaction.table.price')" />
        <Column field="total" :header="$t('transaction.table.total')" >
          <template #body="{ data }">
            {{ data.price * data.quantity }}
          </template>
        </Column>
      </DataTable>
    </article>
    <div class="separator">
      <Select editable :options="typePayment" optionLabel="name" optionValue="code" :placeholder="$t('transaction.paymentTypePlaceholder')" fluid />
      <BadgeDisplay
        class="separator-badge"
        label="Total:"
        :value="`$${totalSum}`"
        color="#000000"
        withContainer
        radius="10px"
      />
    </div>
    <div class="transaction-debtor">
      <Select :placeholder="$t('transaction.debtorSelectPlaceholder')" fluid />
      <Button 
        label="+"
        @click="selectAddDebtor = !selectAddDebtor"
      />
    </div>
    <Transition name="slide-fade">
      <DebtsNewDebtor input-color="#FFFFFF" v-if="selectAddDebtor"/>
    </Transition>
  </section>
  <Dialog v-model:visible="selectComponent" modal>
    <template #default>
      <TransactionSelectProduct @update:selectedProduct="onSelectedProducts" />
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
    justify-content: space-between;
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

.actions {
  display: flex;
  gap: 2rem;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 500px;
  opacity: 1;
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
