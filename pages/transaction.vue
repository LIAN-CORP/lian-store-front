<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
import {
  useTransactionTypes,
  useTransactionPaymentTypes,
} from "~/constants/transaction.constant";

const { onDeleteState, onClearState, onGetState } = useCartState();
const cart = onGetState();

const { typeTransaction } = useTransactionTypes();
const { typePayment } = useTransactionPaymentTypes();

const selectComponent = ref(false);
const selectAddDebtor = ref(false);

const selectedTransactionType = ref("");
const selectedPaymentType = ref("");
const selectedDebtor = ref("");

function onCellEditComplete(event: any) {
  const { data, field, newValue } = event;
  data[field] = newValue;
}

function deleteRow(data: any) {
  onDeleteState(data);
}

const totalSum = computed(() => {
  if (cart.value == null) {
    return 0;
  }
  return cart.value.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);
});

function submitTransaction() {
  /*   console.log('Submitting transaction...');
  console.log('Transaction type:', selectedTransactionType.value);
  console.log('Payment type:', selectedPaymentType.value);
  console.log('Selected products:', selectedProducts.value);
  const transaction: TransactionRequest = {
    transaction: {
      typeMovement: selectedTransactionType.value,
      userId: "18d8af95-7ee5-41d4-bc76-b37ff4c11579"
    },
    products: selectedProducts.value.map(product => ({
      productId: product.id,
      quantity: product.quantity
    }))
  } */
}
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
        <Select
          v-model="selectedTransactionType"
          :options="typeTransaction"
          optionLabel="name"
          optionValue="code"
          :placeholder="$t('transaction.typeMovementPlaceholder')"
        />
      </div>
      <div>
        <Button
          :label="$t('transaction.submit')"
          @click="submitTransaction"
          severity="success"
        />
      </div>
    </article>

    <article class="transaction-body">
      <DataTable
        :value="cart"
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
        <Column field="total" :header="$t('transaction.table.total')">
          <template #body="{ data }">
            {{ data.price * data.quantity }}
          </template>
        </Column>
        <Column class="w-24 !text-end">
          <template #body="{ data }">
            <Button @click="deleteRow(data.id)" severity="danger" rounded>
              <template #icon>
                <Icon
                  icon="material-symbols:close"
                  width="1.5em"
                  height="1.5em"
                  style="color: #fff"
                />
              </template>
            </Button>
          </template>
        </Column>
      </DataTable>
    </article>
    <div class="separator">
      <Select
        v-model="selectedPaymentType"
        :options="typePayment"
        optionLabel="name"
        optionValue="code"
        :placeholder="$t('transaction.paymentTypePlaceholder')"
        fluid
      />
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
      <Button label="+" @click="selectAddDebtor = !selectAddDebtor" />
    </div>
    <Transition name="slide-fade">
      <DebtsNewDebtor v-if="selectAddDebtor" />
    </Transition>
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
