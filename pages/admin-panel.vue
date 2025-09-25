<script lang="ts" setup>
async function onReject(id: string) {
  console.log(id);
}
async function onAccept(id: string) {
  console.log(id);
}
</script>

<template>
  <section class="admin">
    <Message class="admin-message" severity="warn">
      {{ $t("auth.admin.timeout") }}</Message
    >
    <DataTable data-key="id" paginator>
      <Column field="id" :header="$t('auth.admin.id')" />
      <Column field="createdAt" :header="$t('auth.admin.date')" />
      <Column field="firstName" :header="$t('auth.admin.name')" />
      <Column field="email" :header="$t('auth.admin.email')" />
      <Column field="status" :header="$t('auth.admin.status')" />
      <Column field="actions" :header="$t('auth.admin.actions')">
        <template #body="{ data }">
          <IconButton
            variant="text"
            severity="info"
            @click="onAccept(data)"
            icon="lets-icons:chat-search"
            icon-color="#172455"
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
