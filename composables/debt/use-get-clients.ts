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
    const url = useGetApiUrl("client");
    try {
      result.loading = true;
      const data = await $fetch<getListClient[]>(url, {
        query: {
          name: name,
        },
      });

      result.clients = data.map((c) => ({
        id: c.id,
        name: c.name,
        phone: c.phone,
        disabled: c.name == "Generic Client",
      }));
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
