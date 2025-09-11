<script lang="ts" setup>
import { Icon } from "@iconify/vue/dist/iconify.js";
withDefaults(
  defineProps<{
    icon?: string;
    iconColor?: string;
    iconSize?: string;
    label?: string;
    severity?: string;
    size?: string;
    disabled?: boolean;
    rounded?: boolean;
    raised?: boolean;
  }>(),
  {
    iconSize: "1.5em",
    iconColor: "#fff",
  }
);
</script>

<template>
  <Button
    :severity="severity"
    :rounded="rounded"
    :raised="raised"
    :label="label"
    :size="size"
    :disabled="disabled"
  >
    <template #icon>
      <Icon
        :icon="icon!"
        :width="iconSize!"
        :height="iconSize!"
        :style="{ color: iconColor }"
      />
    </template>
  </Button>
</template>

<style lang="scss" scoped></style>
