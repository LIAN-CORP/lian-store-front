<script lang="ts" setup>
import { InputText } from "primevue";

const emit = defineEmits(["update:modelValue"]);

const model = defineModel({
  type: String,
});

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
  maxlength: {
    type: Number,
    required: false,
    default: null,
  },
  minlength: {
    type: Number,
    required: false,
    default: null,
  },
  pattern: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<template>
  <div class="formField">
    <FloatLabel variant="on">
      <InputText
        :name="name"
        :placeholder="placeholder"
        :fluid="fluid"
        :size="size"
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        :pattern="pattern"
        v-model="model"
        @update:modelValue="emit('update:modelValue', $event)"
      />
      <label>{{ label }}</label>
    </FloatLabel>
    <Message v-if="error" variant="simple" size="small" severity="error">{{
      error
    }}</Message>
  </div>
</template>

<style lang="scss" scoped>
.p-inputtext {
  background-color: #eef2ff;

  &-fluid {
    background-color: #eef2ff;
  }
}
</style>
