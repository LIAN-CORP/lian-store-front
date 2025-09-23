import type { GetPayment } from "~/interfaces/payment/response/get.payment";

export default function useGetClientPayments() {
  const payments = ref<GetPayment[] | null>(null);
  const loading = ref<boolean>(false);
  async function GetPayment(client_id: string) {
    const url = useGetApiUrl(`payment/debt/${client_id}`);
    try {
      loading.value = true;
      payments.value = await $fetch<GetPayment[]>(url);
    } catch (e: any) {
      payments.value = null;
    } finally {
      loading.value = false;
    }
  }
  return {
    payments,
    loading,
    GetPayment,
  };
}
