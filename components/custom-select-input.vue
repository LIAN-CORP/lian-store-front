<script lang="ts" setup generic="T">
import { Icon } from "@iconify/vue/dist/iconify.js";

const props = defineProps<{
  title?: string;
  name: string;
  propOptions?: T[];
  label: string;
  disabled?: boolean;
  disableButton1?: boolean;
  disableButton2?: boolean;
  button1Icon?: boolean;
  button2Icon?: boolean;
  button1Severity?: string;
  button2Severity?: string;
}>();
const emit = defineEmits(["onClick1", "onClick2", "clickNew", "modelValue"]);
const { value, errorMessage, resetField } = useField<string>(() => props.name);
function onClickButton1() {
  emit("onClick1", props.title);
}
function onClickButton2() {
  emit("onClick2", props.title);
}
function onClickNew() {
  resetField();
  emit("clickNew", props.title);
}
</script>

<template>
  <div class="select-input">
    <InputGroup>
      <InputGroupAddon>
        <Button @click="onClickButton1" :disabled="disabled">
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
      >
        <template #footer>
          <Button
            @click="onClickNew"
            label="Nuevo"
            fluid
            severity="success"
            variant="text"
            size="small"
          />
        </template>
      </Select>
      <InputGroupAddon v-if="button2Icon">
        <Button @click="onClickButton2" :disabled="disabled">
          <template #icon>
            <Icon icon="mingcute:add-fill" width="20" height="20" />
          </template>
        </Button>
      </InputGroupAddon>
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
