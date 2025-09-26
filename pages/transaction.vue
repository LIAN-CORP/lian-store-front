<script lang="ts" setup>
import {
  GENERIC_CLIENT,
  TRANSACTION_TYPE,
  PAYMENT_METHOD,
} from "../constants/transaction.constant";
const { modalData, modalState, getComponent, open, close } =
  useTransactionModalHandler();

let debounceTimeOut: number | undefined;
const { formatData, loading, saveTransaction } = useNewTransaction();
const { onDeleteState, onClearState, onGetState } = useCartState();
const { result, getClient } = useGetClients();

const cart = onGetState();
const transactionType = ref<string | null>(null);
const paymentMethod = ref<string | null>(null);
const selectedClient = ref<null | any>(null);

const canSend = computed(() => {
  if (cart.value.length === 0) {
    return false;
  }
  switch (transactionType.value) {
    case "COMPRA":
      return !!paymentMethod.value;
    case "CREDITO":
      return !!selectedClient.value;
    case "VENTA":
      return !!selectedClient.value && !!paymentMethod.value;
    default:
      return false;
  }
});
function getProps() {
  switch (modalData.activeForm) {
    case "UpdateClient":
      return {
        id: selectedClient.value.id,
        name: selectedClient.value.name,
        phone: selectedClient.value.phone,
      };
    case "NewClient":
      return {};
    case "SelectProducts":
      return {};
    default:
      return {};
  }
}

function onClearControls() {
  onClearState();
  transactionType.value = null;
  paymentMethod.value = null;
  selectedClient.value = null;
}

function onSearchClient(event: any) {
  if (debounceTimeOut) clearTimeout(debounceTimeOut);
  debounceTimeOut = setTimeout(async () => {
    getClient(event.value);
  }, 500);
}

function onCellEditComplete(event: any) {
  const { data, field, newValue } = event;
  data[field] = newValue;
}

function deleteRow(data: any) {
  onDeleteState(data);
}

async function submitTransaction() {
  let request = null;
  if (transactionType.value != "CREDITO") {
    request = formatData(
      cart.value,
      transactionType.value!,
      selectedClient.value!
    );
  }
  request = formatData(
    cart.value,
    transactionType.value!,
    selectedClient.value!,
    paymentMethod.value!
  );
  await saveTransaction(request);
  onClearControls();
}

function onDisabledClient(): boolean {
  if (transactionType.value != "COMPRA") return false;
  selectedClient.value = GENERIC_CLIENT;
  return true;
}

function getPrice(product: any) {
  return transactionType.value === "COMPRA" ? product.priceBuy : product.price;
}

const max = (stock: number) => {
  return transactionType.value !== "COMPRA" ? stock : undefined;
};

watch(transactionType, (newType) => {
  cart.value.forEach((item: any) => {
    if (newType !== "COMPRA" && item.quantity > item.stock) {
      item.quantity = item.stock;
    }
  });
});

const totalSum = computed(() => {
  if (cart.value == null) {
    return 0;
  }
  return cart.value.reduce((sum, product) => {
    return sum + getPrice(product) * product.quantity;
  }, 0);
});

onMounted(async () => {
  onClearState();
  getClient();
});
</script>

<template>
  <section class="transaction">
    <article class="transaction-header">
      <div class="actions">
        <Button
          :label="$t('transaction.addProduct')"
          @click="open('SelectProducts')"
          severity="success"
        />
        <Select
          class="transaction-type"
          v-model="transactionType"
          :options="TRANSACTION_TYPE"
          :optionLabel="(option) => $t(option.name)"
          optionValue="code"
          :placeholder="$t('transaction.typeMovementPlaceholder')"
          @change="
            paymentMethod = null;
            selectedClient = null;
          "
        />
      </div>
      <div></div>
    </article>

    <article class="transaction-body">
      <DataTable
        :value="cart"
        data-key="id"
        edit-mode="cell"
        :rows="5"
        paginator
        @cell-edit-complete="onCellEditComplete"
      >
        <Column field="product" :header="$t('transaction.table.product')" />
        <Column
          field="quantity"
          :header="$t('transaction.table.quantity')"
          :body-style="{ backgroundColor: '#f5f5f5' }"
        >
          <template #editor="{ data, field }">
            <InputNumber
              v-model="data[field]"
              showButtons
              :min="1"
              button-layout="horizontal"
              size="small"
              :max="max(data.stock)"
              @update:modelValue="
                (val) => {
                  data[field] = val ?? 1;
                }
              "
            />
          </template>
        </Column>
        <Column :header="$t('transaction.table.price')">
          <template #body="{ data }">
            ${{ formatAmount(getPrice(data)) }}
          </template>
        </Column>
        <Column field="total" :header="$t('transaction.table.total')">
          <template #body="{ data }">
            ${{ formatAmount(getPrice(data) * data.quantity) }}
          </template>
        </Column>
        <Column class="w-24 !text-end">
          <template #body="{ data }">
            <IconButton
              variant="text"
              severity="danger"
              @click="deleteRow(data.id)"
              icon="material-symbols:close"
              icon-color="#EF4444"
            />
          </template>
        </Column>
      </DataTable>
    </article>
    <div class="separator">
      <Select
        v-if="transactionType != 'CREDITO'"
        v-model="paymentMethod"
        :options="PAYMENT_METHOD"
        :optionLabel="(option) => $t(option.name)"
        optionValue="code"
        :placeholder="$t('transaction.paymentTypePlaceholder')"
        fluid
      />
      <BadgeDisplay
        class="separator-badge"
        label="Total:"
        :value="`$ ${formatAmount(totalSum)}`"
        color="#000000"
        withContainer
        radius="10px"
      />
    </div>
    <div class="transaction-debtor">
      <InputGroup>
        <InputGroupAddon>
          <IconButton
            icon="grommet-icons:edit"
            :disabled="!selectedClient"
            @click="open('UpdateClient')"
          />
        </InputGroupAddon>
        <Select
          name="client"
          :placeholder="$t('transaction.clientSelectPlaceholder')"
          :disabled="onDisabledClient()"
          v-model="selectedClient"
          option-label="name"
          :options="result.clients!"
          filter
          @filter="onSearchClient"
          fluid
          :option-disabled="
            (option) => option.disabled && transactionType === 'CREDITO'
          "
        >
          <template #footer>
            <Button
              @click="open('NewClient')"
              :label="$t('transaction.newClientButton')"
              fluid
              severity="success"
              variant="text"
              size="small"
            /> </template
        ></Select>
      </InputGroup>
    </div>
    <Button
      :disabled="!canSend"
      class="save-button"
      :label="$t('transaction.submit')"
      @click="submitTransaction"
      severity="success"
    />
  </section>
  <Dialog
    v-model:visible="modalState"
    :header="modalData.activeFormTranslate"
    modal
  >
    <template #default>
      <component
        :is="getComponent()"
        v-bind="getProps()"
        @created="
          getClient();
          close();
        "
      />
    </template>
  </Dialog>
  <LoadingScreen :state="loading" />
</template>

<style lang="scss" scoped>
.transaction {
  max-width: 1400px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  gap: 1rem;
  border-radius: 10px;
  box-shadow: 0px 0px 7px -3px rgba(66, 68, 90, 1);
  &-header {
    width: 100%;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    .transaction-type {
      min-width: 200px;
    }
  }
  &-body {
    width: 100%;
    ::v-deep(.p-inputnumber) {
      .p-inputnumber-input {
        width: 50px;
        height: 25px;
      }
    }
    .editable-column {
      background-color: gray;
    }
  }
  .separator {
    display: flex;
    width: 100%;
    align-items: center;
    gap: 1rem;
    &-badge {
      width: 100%;
    }
  }
  &-debtor {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    gap: 1rem;
  }
  .save-button {
    flex-grow: 0;
    max-width: 200px;
  }
}
.actions {
  display: flex;
  gap: 2rem;
}

@media (max-width: 800px) {
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
  .actions {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
