<script lang="ts" setup>
const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(
  defineProps<{
    id: string;
    name: string;
    label: string;
    fluid?: boolean;
    showButtons?: boolean;
    size?: string;
    placeholder?: string;
    disabled?: boolean;
    prefix?: string;
    suffix?: string;
    min?: number;
    max?: number;
    step?: number;
    inputColor?: string;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    locale?: string;
    mode?: string;
    currency?: string;
  }>(),
  {
    fluid: true,
    min: 0,
    step: 1,
    inputColor: "#eef2ff",
    minFractionDigits: 0,
    maxFractionDigits: 0,
    locale: "es-CO",
  }
);
const { value, errorMessage } = useField<number>(() => props.name);
function onInput(event: any) {
  value.value = event.value;
}
</script>

<template>
  <div class="formField">
    <FloatLabel
      variant="on"
      :style="{
        '--p-floatlabel-on-active-background': inputColor,
      }"
    >
      <InputNumber
        :mode="mode"
        :currency="currency"
        :locale="locale"
        :minFractionDigits="minFractionDigits"
        :maxFractionDigits="maxFractionDigits"
        :inputStyle="{ backgroundColor: inputColor }"
        :inputId="props.id"
        :name="props.name"
        :placeholder="props.placeholder"
        :fluid="props.fluid"
        :size="props.size"
        :showButtons="props.showButtons"
        :disabled="props.disabled"
        :prefix="props.prefix"
        :suffix="props.suffix"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        buttonLayout="vertical"
        v-model:modelValue="value"
        @input="onInput"
      />
      <label :for="props.id">{{ props.label }}</label>
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
