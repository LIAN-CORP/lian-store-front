import type { GetPayment } from "~/interfaces/payment/response/get.payment";

export default function useGetClientPayments() {
  const payments = ref<GetPayment[] | null>(null);
  const loading = ref<boolean>(false);
  async function getPayment(client_id: string) {
    const {
      loading: load,
      data,
      execute,
    } = useApiFetch<GetPayment[]>(`payment/debt/${client_id}`);
    watch(load, (val) => {
      loading.value = val;
    });
    await execute();
    payments.value = data.value ?? null;
  }
  return {
    payments,
    loading,
    getPayment,
  };
}
