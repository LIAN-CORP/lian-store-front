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
    const {
      data,
      execute,
      loading: load,
    } = useApiFetch<getListClient[]>("client", {
      query: {
        name: name,
      },
    });
    watch(load, (val) => {
      result.loading = val;
    });
    await execute();
    if (!data.value) return;
    result.clients = data.value?.map((c) => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      disabled: c.name == "Generic Client",
    }));
    return result;
  }
  return {
    result,
    getClient,
  };
}
