<script lang="ts" setup>
import type { PageState } from "primevue";

const page = ref<number>(0);
const size = 10;
const isRefreshing = ref(false);
const { getRequest, loading, request } = useRegistrationRequest();

async function onReject(id: string) {
  console.log(id);
}
async function onAccept(id: string) {
  console.log(id);
}
function getStatusStyle(status: string) {
  switch (status) {
    case "PENDING":
      return {
        backgroundColor: "#fef08a",
        color: "#854d0e",
      };
    case "ACCEPTED":
      return {
        backgroundColor: "#bbf7d0",
        color: "#166534",
      };
    case "REJECTED":
      return {
        backgroundColor: "#fecaca",
        color: "#991b1b",
      };
    default:
      return {};
  }
}

async function onRefresh() {
  if (isRefreshing.value) return;
  isRefreshing.value = true;
  await getRequest(page.value, size);
  setTimeout(() => {
    isRefreshing.value = false;
  }, 10000);
}
async function onPageChange(e: PageState) {
  page.value = e.page;
  await getRequest(page.value, size);
}

onMounted(async () => {
  await getRequest(page.value, size);
});
</script>

<template>
  <section class="admin">
    <Message class="admin-message" severity="warn">
      {{ $t("auth.admin.timeout") }}</Message
    >
    <DataTable
      data-key="id"
      :value="request?.content"
      :loading="loading"
      :rows="size"
      paginator
      lazy
      @page="onPageChange"
      :total-records="request?.totalElements ?? 0"
    >
      <template #header>
        <IconButton
          icon="material-symbols:refresh-rounded"
          rounded
          @click="onRefresh"
          :disabled="isRefreshing"
        />
      </template>
      <Column field="id" :header="$t('auth.admin.id')" />
      <Column field="createdAt" :header="$t('auth.admin.date')" />
      <Column field="firstName" :header="$t('auth.admin.name')" />
      <Column field="email" :header="$t('auth.admin.email')" />
      <Column field="status" :header="$t('auth.admin.status')">
        <template #body="{ data }">
          <span
            :style="{
              padding: '0.5em',
              borderRadius: '0.5em',
              fontWeight: 'bold',
              ...getStatusStyle(data.status),
            }"
            >{{ data.status }}</span
          >
        </template>
      </Column>
      <Column field="actions" :header="$t('auth.admin.actions')">
        <template #body="{ data }">
          <IconButton
            variant="text"
            severity="info"
            @click="onAccept(data)"
            icon="material-symbols:check-circle-outline"
            icon-color="#22c55e"
          />
          <IconButton
            variant="text"
            severity="danger"
            @click="onReject(data.id)"
            icon="material-symbols:close"
            icon-color="#EF4444"
          />
        </template>
      </Column>
    </DataTable>
  </section>
</template>

<style lang="scss" scoped>
.admin {
  padding: 2em 1em;
  &-message {
    margin-bottom: 1em;
  }
}
</style>
