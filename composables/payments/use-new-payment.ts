import type { ErrorResponse } from "~/interfaces/error.response";
import type { NewPaymentRequest } from "~/interfaces/payment/request/new.payment.request";

export default function useNewPayment() {
  const loading = ref<boolean>(false);
  const url = useGetApiUrl("payment/debt", "paymentApi");
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  const { errorToast, successToast } = useCreateToast();

  async function savePayment(payment: NewPaymentRequest) {
    loading.value = true;
    try {
      await $fetch(url, {
        method: "POST",
        body: payment,
      });
      const msg = getSuccessTranslate("response.success.new_payment");
      successToast(msg);
    } catch (e: any) {
      const error = e.data as ErrorResponse;
      const msg = getErrorTranslate(error.type);
      errorToast(msg);
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    savePayment,
  };
}
