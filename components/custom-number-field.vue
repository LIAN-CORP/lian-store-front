<script lang="ts" setup>
const model = defineModel({
  type: Number,
});

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
  }>(),
  {
    fluid: true,
    min: 0,
    step: 1,
    inputColor: "#eef2ff",
  }
);
</script>

<template>
  <div class="formField">
    <FormField v-slot="$field" :name="name">
      <FloatLabel
        variant="on"
        :style="{
          '--p-floatlabel-on-active-background': inputColor,
        }"
      >
        <InputNumber
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
        />
        <label :for="props.id">{{ props.label }}</label>
      </FloatLabel>
      <Message
        v-if="$field.invalid"
        variant="simple"
        size="small"
        severity="error"
        >{{ $field.error?.message }}</Message
      >
    </FormField>
  </div>
</template>

<style lang="scss" scoped></style>
