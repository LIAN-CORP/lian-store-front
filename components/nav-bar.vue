<script setup lang="ts">
import { Icon } from "@iconify/vue";

const activeLanguage = ref();
const router = useRouter();
const route = useRoute();
const { t, setLocale, locale } = useI18n();
const localePath = useLocalePath();
const role = useCookie("role");
function isActive(itemRoute: string) {
  if (!itemRoute) return false;
  return route.path == localePath(itemRoute);
}

const items = computed(() => [
  {
    label: t("menuOptions.transaction"),
    icon: "material-symbols:add-shopping-cart",
    to: "/transaction",
    class: "active_item",
    command: () => {
      router.push(localePath("/transaction"));
    },
  },
  {
    label: t("menuOptions.inventory"),
    icon: "material-symbols:inventory-2",
    to: "/inventory",
    command: () => {
      router.push(localePath("/inventory"));
    },
  },
  {
    label: t("menuOptions.debtors"),
    icon: "material-symbols:folder-shared-sharp",
    to: "/debts",
    command: () => {
      router.push(localePath("/debts"));
    },
  },
  {
    label: t("menuOptions.history"),
    icon: "material-symbols:history",
    to: "/history",
    command: () => {
      router.push(localePath("/history"));
    },
  },
  {
    label: t("menuOptions.user"),
    icon: "material-symbols:user-attributes-rounded",
    visible: role.value == "ADMIN",
    command: () => {
      router.push(localePath("/admin-panel"));
    },
  },
  {
    label: t("menuOptions.logout"),
    type: "logout",
    icon: "streamline:logout-1-solid",
    command: () => {
      const token = useCookie("access_token");
      token.value = null;
      role.value = null;
    },
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
      breakpoint="1200px"
    >
      <template #start>
        <h1>Lian Corp</h1>
      </template>
      <template #itemicon="{ item }">
        <Icon
          :icon="item.icon!"
          width="1.5em"
          height="1.5em"
          :color="item.type ? 'red' : ''"
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
          @change="setLocale(activeLanguage)"
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
