<script lang="ts" setup>
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
const { value, errorMessage } = useField<string>(() => props.name);
</script>

<template>
  <div class="formField">
    <FloatLabel variant="on">
      <Textarea
        :style="{ backgroundColor: inputColor }"
        :id="id"
        :name="name"
        :fluid="fluid"
        :placeholder="placeholder"
        :size="size"
        :disabled="disabled"
        v-model:model-value="value"
      />
      <label :for="id">{{ label }}</label>
    </FloatLabel>
    <Message v-if="errorMessage" variant="simple" size="small" severity="error"
      >{{ errorMessage }}
    </Message>
  </div>
</template>

<style lang="scss" scoped></style>
