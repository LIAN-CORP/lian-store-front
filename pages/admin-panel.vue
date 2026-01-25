<script lang="ts" setup>
import type { PageState } from "primevue";
import useRegistrationHistory from "~/composables/auth/use-request-history";
import { REQUEST_STATES } from "../constants/request.states";
import authGlobal from "~/middleware/auth.global";
import admin from "~/middleware/admin";
definePageMeta({
  middleware: [admin],
});

const page = ref<number>(0);
const pageHistory = ref<number>(0);
const size = 5;
const isRefreshing = ref(false);
const selectStatus = ref();
const { getRequest, loading, request } = useRegistrationRequest();
const { getHistory, history, loading: historyLoad } = useRegistrationHistory();

const { onResponseRequest, loading: sended } = useRequestActions();

async function onReject(id: string) {
  await onResponseRequest("reject", id);
  await getRequest(page.value, size);
}
async function onAccept(id: string) {
  await onResponseRequest("accept", id);
  await getRequest(page.value, size);
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
  await getHistory(pageHistory.value, size);

  setTimeout(() => {
    isRefreshing.value = false;
  }, 10000);
}
async function onPageChange(e: PageState) {
  page.value = e.page;
  await getRequest(page.value, size);
}
async function onPageHistoryChange(e: PageState) {
  page.value = e.page;
  await getHistory(page.value, size);
}

onMounted(async () => {
  await getRequest(page.value, size);
  await getHistory(pageHistory.value, size);
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
        <div class="title-request">
          <h3>{{ $t("auth.admin.title") }}</h3>
          <IconButton
            icon="material-symbols:refresh-rounded"
            rounded
            @click="onRefresh"
            :disabled="isRefreshing"
          />
        </div>
      </template>
      <Column field="id" :header="$t('auth.admin.id')" />
      <Column field="createdAt" :header="$t('auth.admin.date')">
        <template #body="{ data }">
          {{ data.createdAt }}
        </template>
      </Column>
      <Column field="firstName" :header="$t('auth.admin.name')">
        <template #body="{ data }">
          {{ `${data.firstName} ${data.lastName}` }}
        </template>
      </Column>
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
            @click="onAccept(data.id)"
            icon="material-symbols:check-circle-outline"
            icon-color="#22c55e"
            :disabled="sended"
          />
          <IconButton
            variant="text"
            severity="danger"
            @click="onReject(data.id)"
            icon="material-symbols:close"
            icon-color="#EF4444"
            :disabled="sended"
          />
        </template>
      </Column>
    </DataTable>
    <DataTable
      data-key="id"
      :value="history?.content"
      :loading="historyLoad"
      :rows="size"
      paginator
      lazy
      @page="onPageHistoryChange"
      :total-records="history?.totalElements ?? 0"
    >
      <template #header>
        <h3 class="title-history">{{ $t("auth.history.title") }}</h3>
        <Select
          show-clear
          class="states"
          fluid
          v-model="selectStatus"
          :options="REQUEST_STATES"
          :optionLabel="(option) => $t(option.name)"
          optionValue="code"
          :placeholder="$t('auth.status.placeholder')"
          @change="getHistory(pageHistory, size, selectStatus)"
        />
      </template>
      <Column field="id" :header="$t('auth.history.id')" />
      <Column field="createdAt" :header="$t('auth.history.date')">
        <template #body="{ data }">
          {{ data.createdAt }}
        </template>
      </Column>
      <Column field="firstName" :header="$t('auth.history.name')">
        <template #body="{ data }">
          {{ `${data.firstName} ${data.lastName}` }}
        </template>
      </Column>
      <Column field="email" :header="$t('auth.history.email')" />
      <Column field="status" :header="$t('auth.history.status')">
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
      <Column field="reason" :header="$t('auth.history.reason')" />
    </DataTable>
  </section>
</template>

<style lang="scss" scoped>
.admin {
  max-width: 1400px;
  margin: auto;
  .title {
    &-history {
      width: 100%;
      text-align: center;
    }
    &-request {
      display: flex;
      gap: 1em;
      justify-content: space-between;
    }
  }
  padding: 2em 1em;
  &-message {
    margin-bottom: 1em;
  }
  .states {
    margin-top: 1em;
    margin-bottom: 1em;
  }
}
</style>
