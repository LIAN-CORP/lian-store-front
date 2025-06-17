<script setup lang="ts">
import { Icon } from "@iconify/vue";

const activeLanguage = ref();
const router = useRouter();
const route = useRoute();

function isActive(itemRoute: string) {
  return route.path == itemRoute;
}

const items = ref([
  {
    label: "Transacción",
    icon: "hugeicons:transaction",
    to: "/transaction",
    class: "active_item",
    command: () => {
      router.push("/transaction");
    },
  },
  {
    label: "Inventario",
    icon: "si:inventory-fill",
    to: "/inventory",
    command: () => {
      router.push("/inventory");
    },
  },
  {
    label: "Deudores",
    icon: "lucide:book-user",
    to: "/debts",
    command: () => {
      router.push("/debts");
    },
  },
  {
    label: "Movimientos",
    icon: "mdi:report-box",
    to: "/movements",
    command: () => {
      router.push("/movements");
    },
  },
  {
    label: "salir",
    type: "logout",
  },
]);

const languages = ref([
  { unicode: "🇨🇴", code: "es" },
  { unicode: "🇬🇧", code: "en" },
]);
</script>

<template>
  <div>
    <Menubar
      :model="items"
      :pt="{
        itemContent: ({ context }) => ({
          style: isActive(context.item.to) ? 'background-color: #4155a4' : '',
        }),
      }"
      breakpoint="1020px"
    >
      <template #start>
        <h1>Lian Corp</h1>
      </template>
      <template #itemicon="{ item }">
        <Icon
          v-if="!item.type"
          :icon="item.icon!"
          width="1.5em"
          height="1.5em"
        />
        <Icon
          v-if="item.type == 'logout'"
          icon="streamline:logout-1-solid"
          width="1.3em"
          height="1.3em"
          style="color: #ff0101"
        />
      </template>

      <template #end>
        <Select
          default-value="es"
          size="small"
          v-model="activeLanguage"
          :options="languages"
          option-value="code"
          option-label="unicode"
          @change="$i18n.setLocale(activeLanguage)"
        >
          <template #option="slotProps">
            <div class="options-label">
              <span>{{ slotProps.option.unicode }}</span>
              <span>{{ slotProps.option.code.toUpperCase() }}</span>
            </div>
          </template>
        </Select>
      </template>
    </Menubar>
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: #ffffff;
  font-family: "LibreBarCode128";
  font-size: 3rem;
}
.options-label {
  display: flex;
  gap: 0.5rem;
}
.p-select {
  background-color: #172455;
  border: solid 1px #364065;
}
</style>
