import type { getListClient } from "~/interfaces/debt/response/get.list.client";
import type { ErrorResponse } from "~/interfaces/error.response";
import type {
  Client,
  NewTransactionRequest,
} from "~/interfaces/transaction/request/new.transaction.request";
import type { StateProduct } from "~/interfaces/transaction/state.product";

export default function useNewTransaction() {
  const loading = ref<boolean>(false);
  const url = useGetApiUrl("transaction", "transactionApi");
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  const { errorToast, successToast } = useCreateToast();

  async function saveTransaction(transaction: NewTransactionRequest) {
    loading.value = true;
    try {
      await $fetch(url, {
        method: "POST",
        body: transaction,
      });
      const msg = getSuccessTranslate("response.success.new_client");
      successToast(msg);
    } catch (e: any) {
      const error = e.data as ErrorResponse;
      const msg = getErrorTranslate(error.type);
      errorToast(msg);
    } finally {
      loading.value = false;
    }
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
        userId: "aff909ec-1583-41b6-90b4-b04287c6b7b9",
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
