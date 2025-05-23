<script lang="ts" setup>
defineProps<{
  label: string;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  value: number | string;
  withContainer?: boolean;
}>();
</script>

<template>
  <div
    :style="[
      { color: color },
      withContainer
        ? {
            backgroundColor: backgroundColor,
            borderColor: borderColor,
          }
        : {},
    ]"
    :class="['badge', { 'with-container': withContainer }]"
  >
    <span class="badge-label">{{ label }}</span>
    <span class="badge-value">{{ value }}</span>
  </div>
</template>

<style lang="scss" scoped>
.badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  &-label {
    text-align: center;
    font-weight: 600;
  }
  &-value {
    text-align: center;
    background-color: #ffffff;
    padding: 0.5rem;
    border-radius: 1rem;
    box-shadow: 1px 3px 3px 0px rgba(0, 0, 0, 0.15);
  }
  &.with-container {
    padding: 0 1rem;
    background-color: #ffffff;
    border: 1px solid #939393;
    border-radius: 2rem;
    .badge-value {
      background-color: transparent;
      border-radius: none;
      box-shadow: none;
    }
  }
}
@media (width < 800px) {
  .badge {
    &-label {
      font-size: 0.7rem;
    }
    &-value {
      font-size: 0.7rem;
    }
  }
}
</style>
