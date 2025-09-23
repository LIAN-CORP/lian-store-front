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
    dateFormat?: string;
    isManual?: boolean;
  }>(),
  {
    fluid: true,
    inputColor: "#eef2ff",
    isManual: false,
  }
);
const { value, errorMessage } = useField<Date>(() => props.name);
</script>

<template>
  <div class="formField">
    <FloatLabel
      variant="on"
      :style="{
        '--p-floatlabel-on-active-background': inputColor,
      }"
    >
      <DatePicker
        v-model="value"
        :input-id="id"
        :fluid="fluid"
        :name="name"
        :disabled="disabled"
        :size="size"
        :dateFormat="dateFormat"
        :manual-input="isManual"
      />
      <label :for="id">{{ label }}</label>
    </FloatLabel>
    <Message v-if="errorMessage" variant="simple" size="small" severity="error"
      >{{ errorMessage }}
    </Message>
  </div>
</template>

<style lang="scss" scoped></style>
