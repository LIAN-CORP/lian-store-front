<script setup lang="ts">
import { Icon } from "@iconify/vue";

const activeLanguage = ref();
const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();
function isActive(itemRoute: string) {
  if (!itemRoute) return false;
  return route.path == localePath(itemRoute);
}

const items = computed(() => [
  {
    label: t("menuOptions.transaction"),
    icon: "hugeicons:transaction",
    to: "/transaction",
    class: "active_item",
    command: () => {
      router.push(localePath("/transaction"));
    },
  },
  {
    label: t("menuOptions.inventory"),
    icon: "si:inventory-fill",
    to: "/inventory",
    command: () => {
      router.push(localePath("/inventory"));
    },
  },
  {
    label: t("menuOptions.debtors"),
    icon: "lucide:book-user",
    to: "/debts",
    command: () => {
      router.push(localePath("/debts"));
    },
  },
  {
    label: t("menuOptions.history"),
    icon: "mdi:report-box",
    to: "/history",
    command: () => {
      router.push(localePath("/history"));
    },
  },
  {
    label: t("menuOptions.logout"),
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
          :default-value="locale"
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
