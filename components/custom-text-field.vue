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
    <FormField v-slot="$field" :name="name">
      <FloatLabel
        variant="on"
        :style="{
          '--p-floatlabel-on-active-background': inputColor,
        }"
      >
        <InputText
          :style="{ backgroundColor: inputColor }"
          :id="id"
          :name="name"
          :placeholder="placeholder"
          :fluid="fluid"
          :size="size"
          :disabled="disabled"
          :maxlength="maxlength"
          :minlength="minlength"
          :pattern="pattern"
        />
        <label :for="id">{{ label }}</label>
      </FloatLabel>
      <Message
        v-if="$field?.invalid"
        variant="simple"
        size="small"
        severity="error"
        >{{ $field.error?.message }}</Message
      >
    </FormField>
  </div>
</template>

<style lang="scss" scoped></style>
