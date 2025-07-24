<script lang="ts" setup>
withDefaults(
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
      <FloatLabel variant="on">
        <Textarea
          :style="{ backgroundColor: inputColor }"
          :id="id"
          :name="name"
          :fluid="fluid"
          :placeholder="placeholder"
          :size="size"
          :disabled="disabled"
        />
        <label :for="id">{{ label }}</label>
      </FloatLabel>
      <Message
        v-if="$field.invalid"
        variant="simple"
        size="small"
        severity="error"
        >{{ $field.error?.message }}
      </Message>
    </FormField>
  </div>
</template>

<style lang="scss" scoped></style>
