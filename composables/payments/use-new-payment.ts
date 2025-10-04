import type { NewPaymentRequest } from "~/interfaces/payment/request/new.payment.request";

export default function useNewPayment() {
  const loading = ref<boolean>(false);
  const { getErrorTranslate, getSuccessTranslate } = useHandleResponse();
  const { errorToast, successToast } = useCreateToast();

  async function savePayment(payment: NewPaymentRequest) {
    const {
      error,
      loading: load,
      execute,
    } = useApiFetch("payment/debt", {
      method: "POST",
      body: payment,
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
    const msg = getSuccessTranslate("response.success.new_payment");
    successToast(msg);
  }

  return {
    loading,
    savePayment,
  };
}
