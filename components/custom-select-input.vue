<script lang="ts" setup generic="T">
import { Icon } from "@iconify/vue/dist/iconify.js";

const selected = ref(null);
const props = defineProps<{
  name?: string;
  propOptions?: T[];
  label: string;
  disabled?: boolean;
}>();
const emit = defineEmits(["onClick", "modelValue"]);

function onClickButton() {
  selected.value = null;
  emit("onClick", props.name);
  emit("modelValue");
}
</script>

<template>
  <div class="select-input">
    <FormField :name="name" v-slot="$field">
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
          v-model="selected"
          :options="propOptions"
          :disabled="disabled"
          @update:modelValue="$emit('modelValue', selected)"
        />
      </InputGroup>
      <Message
        v-if="$field.error"
        variant="simple"
        size="small"
        severity="error"
        >{{ $field.error?.message }}</Message
      >
    </FormField>
  </div>
</template>

<style lang="scss" scoped>
.select-input {
  display: flex;
  flex-direction: column;
}
</style>
