import type {
  Client,
  NewTransactionRequest,
} from "~/interfaces/transaction/request/new.transaction.request";
import type { StateProduct } from "~/interfaces/transaction/state.product";

export default function useNewTransaction() {
  const loading = ref<boolean>(false);
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  const { errorToast, successToast } = useCreateToast();

  async function saveTransaction(transaction: NewTransactionRequest) {
    const {
      loading: load,
      error,
      execute,
    } = useApiFetch("transaction", {
      method: "POST",
      body: transaction,
    });
    watch(load, (val) => {
      loading.value = val;
    });
    await execute();
    if (error.value) {
      const msg = getErrorTranslate(error.value.type);
      errorToast(msg);
      return;
    }
    const msg = getSuccessTranslate("response.success.new_transaction");
    successToast(msg);
  }
  function formatData(
    stateProducts: StateProduct[],
    typeMovement: string,
    client: Client,
    typePayment?: string
  ): NewTransactionRequest {
    const data: NewTransactionRequest = {
      products: stateProducts.map((p) => ({
        productId: p.id,
        quantity: p.quantity,
      })),
      transaction: {
        client: client,
        typeMovement: typeMovement,
        userId: "612a316e-c9b4-4cc4-91bd-1a24aadf94f0",
      },
    };
    if (typePayment) {
      data.paymentMethod = typePayment;
    }
    return data;
  }

  return {
    loading,
    saveTransaction,
    formatData,
  };
}
