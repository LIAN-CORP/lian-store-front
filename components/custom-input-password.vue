<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    id: string;
    name: string;
    label: string;
    size?: string;
    inputColor?: string;
    fluid?: boolean;
    disabled?: boolean;
    feedback?: boolean;
  }>(),
  {
    fluid: true,
    inputColor: "#eef2ff",
  }
);

const { value, errorMessage } = useField<string>(() => props.name);
</script>

<template>
  <div class="formField">
    <FloatLabel
      variant="on"
      :style="{
        '--p-floatlabel-on-active-background': inputColor,
      }"
    >
      <Password
        :style="{ backgroundColor: inputColor }"
        :input-id="id"
        :name="name"
        :fluid="fluid"
        :size="size"
        :disabled="disabled"
        v-model:model-value="value"
        :feedback="false"
        toggle-mask
      >
      </Password>
      <label :for="id">{{ label }}</label>
    </FloatLabel>
    <Message
      v-if="errorMessage"
      variant="simple"
      size="small"
      severity="error"
      >{{ errorMessage }}</Message
    >
  </div>
</template>

<style lang="scss" scoped></style>
