<script lang="ts" setup>
const model = defineModel({
  type: String,
});
const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(
  defineProps<{
    id: string;
    name: string;
    label: string;
    error?: string;
    size?: string;
    placeholder?: string;
    pattern?: string;
    inputColor?: string;
    fluid?: boolean;
    disabled?: boolean;
    maxlength?: number;
    minlength?: number;
  }>(),
  {
    fluid: true,
    inputColor: "#eef2ff",
  }
);
</script>

<template>
  <div class="formField">
    <FloatLabel
      variant="on"
      :style="{
        '--p-floatlabel-on-active-background': inputColor,
      }"
    >
      <InputText
        :style="{ backgroundColor: inputColor }"
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

<style lang="scss" scoped></style>
