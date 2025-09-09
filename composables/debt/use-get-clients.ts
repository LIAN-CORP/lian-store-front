import type { getListClient } from "~/interfaces/debt/response/get.list.client";

export default function useGetClients() {
  const result = reactive<{
    clients: getListClient[] | null;
    loading: boolean;
  }>({
    clients: null,
    loading: false,
  });

  async function getClient(name?: string) {
    const url = useGetApiUrl("client", "transactionApi");
    try {
      result.loading = true;
      result.clients = await $fetch<getListClient[]>(url, {
        query: {
          name: name,
        },
      });
    } catch (e: any) {
      result.clients = null;
    } finally {
      result.loading = false;
    }
    return result;
  }
  return {
    result,
    getClient,
  };
}
