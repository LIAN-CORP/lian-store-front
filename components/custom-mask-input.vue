<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    id: string;
    name: string;
    label: string;
    mask: string;
    size?: string;
    placeholder?: string;
    slot?: string;
    inputColor?: string;
    fluid?: boolean;
    disabled?: boolean;
    autocomplete?: string;
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
    <IftaLabel>
      <InputMask
        :mask="mask"
        :style="{ backgroundColor: inputColor }"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :fluid="fluid"
        :size="size"
        :slot-char="slot"
        :disabled="disabled"
        v-model:model-value="value"
        :autocomplete="autocomplete"
      />
      <label :for="id">{{ label }}</label>
    </IftaLabel>
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
