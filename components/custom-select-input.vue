<script lang="ts" setup generic="T">
import { Icon } from "@iconify/vue/dist/iconify.js";

const props = defineProps<{
  name: string;
  propOptions?: T[];
  label: string;
  disabled?: boolean;
}>();
const emit = defineEmits(["onClick", "modelValue"]);

function onClickButton() {
  emit("onClick", props.name);
  emit("modelValue");
}
const { value, errorMessage } = useField<string>(() => props.name);
</script>

<template>
  <div class="select-input">
    <InputGroup>
      <InputGroupAddon>
        <Button @click="onClickButton">
          <template #icon>
            <Icon icon="mingcute:add-fill" width="20" height="20" />
          </template>
        </Button>
      </InputGroupAddon>

      <Select
        :name="name"
        optionValue="id"
        optionLabel="name"
        :placeholder="label"
        v-model="value"
        :options="propOptions"
        :disabled="disabled"
        @update:modelValue="$emit('modelValue', value)"
      />
    </InputGroup>
    <Message
      v-if="errorMessage"
      variant="simple"
      size="small"
      severity="error"
      >{{ errorMessage }}</Message
    >
  </div>
</template>

<style lang="scss" scoped>
.select-input {
  display: flex;
  flex-direction: column;
}
</style>
