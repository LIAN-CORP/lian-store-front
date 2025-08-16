<script lang="ts" setup generic="T">
import { Icon } from "@iconify/vue/dist/iconify.js";

const props = defineProps<{
  title?: string;
  name: string;
  propOptions?: T[];
  label: string;
  disabled?: boolean;
  disabledButton1?: boolean;
  disabledButton2?: boolean;
  button1Icon?: string;
  button2Icon?: string;
  button1Severity?: string;
  button2Severity?: string;
  newActionLabel?: string;
  optionValue?: string;
}>();
const emit = defineEmits(["onClick1", "onClick2", "clickNew"]);
const { value, errorMessage, resetField } = useField<string>(() => props.name);
function onClickButton1() {
  emit("onClick1");
}
function onClickButton2() {
  emit("onClick2");
}
function onClickNew() {
  resetField();
  emit("clickNew");
}
</script>

<template>
  <div class="select-input">
    <InputGroup>
      <InputGroupAddon v-if="button1Icon">
        <Button
          @click="onClickButton1"
          :disabled="disabledButton1"
          :severity="button1Severity"
        >
          <template #icon>
            <Icon :icon="button1Icon" width="20" height="20" />
          </template>
        </Button>
      </InputGroupAddon>

      <Select
        :name="name"
        :optionValue="optionValue"
        optionLabel="name"
        :placeholder="label"
        v-model="value"
        :options="propOptions"
        :disabled="disabled"
        fluid
      >
        <template #footer v-if="newActionLabel">
          <Button
            @click="onClickNew"
            :label="newActionLabel"
            fluid
            severity="success"
            variant="text"
            size="small"
          />
        </template>
      </Select>
      <InputGroupAddon v-if="button2Icon">
        <Button
          @click="onClickButton2"
          :disabled="disabledButton2"
          :severity="button2Severity"
        >
          <template #icon>
            <Icon :icon="button2Icon" width="20" height="20" />
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
  min-width: 0;
}
</style>
