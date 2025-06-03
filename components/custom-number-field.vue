<script lang="ts" setup>
const model = defineModel({
  type: Number,
});

const emit = defineEmits(["update:modelValue"]);

defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
  fluid: {
    type: Boolean,
    required: false,
    default: true,
  },
  showButtons: {
    type: Boolean,
    required: false,
    default: false,
  },
  size: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  options: {
    type: Object,
    required: false,
    default: () => ({
      prefix: null,
      suffix: null,
      min: null,
      max: null,
      step: 1,
    }),
  },
});
</script>

<template>
  <div class="formField">
    <FloatLabel variant="on">
      <InputNumber
        :inputId="id"
        :name="name"
        :placeholder="placeholder"
        :fluid="fluid"
        :size="size"
        :showButtons="showButtons"
        :disabled="disabled"
        :prefix="options.prefix"
        :suffix="options.suffix"
        :min="options.min"
        :max="options.max"
        :step="options.step"
        buttonLayout="vertical"
        v-model="model"
        @update:modelValue="emit('update:modelValue', $event)"
      />
      <label :for="id">{{ label }}</label>
    </FloatLabel>
    <Message v-if="error" variant="simple" size="small" severity="error">{{
      error
    }}</Message>
  </div>
</template>

<style lang="scss" scoped>
.formField {
  ::v-deep(.p-inputnumber) {
    .p-inputnumber-input {
      background-color: #eef2ff;
    }
  }
}
</style>
