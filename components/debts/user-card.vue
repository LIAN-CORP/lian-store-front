<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";

import { formatAmount } from "#imports";
import type { GetListDebtResponse } from "~/interfaces/debt/response/get.list.debt.response";

const props = defineProps<{
  debt: GetListDebtResponse;
}>();
const emit = defineEmits(["searchDebt"]);
function onSearchDebt() {
  emit("searchDebt", props.debt);
}
</script>

<template>
  <article class="card">
    <div class="card-icon">
      <Icon icon="mingcute:user-4-fill" />
    </div>
    <div class="nothing"></div>
    <div class="card-info">
      <div class="card-buttons">
        <h3 class="user-amount-debt">
          ${{ formatAmount(debt.remainingAmount) }}
        </h3>
        <IconButton
          rounded
          icon="material-symbols:payments-outline"
          @click="onSearchDebt"
        />
      </div>
      <h2 class="user-name">{{ debt.client }}</h2>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 5px 14px 1px rgba(0, 0, 0, 0.25);
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 200px;

  position: relative;
  &-icon {
    position: absolute;
    color: #273e91;
    top: -2rem;
    padding: 0.15rem;
    border-radius: 50%;
    background-color: #ffffff;

    :deep(svg) {
      display: block;
      width: 4em;
      height: 4em;
    }
  }
  .nothing {
    background-color: #273e91;
    width: 100%;
    border-radius: 5px 5px 0 0;
    height: 2.5em;
  }

  &-info {
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: none;
    flex-direction: column;
    padding: 0.5rem;
    justify-items: center;
    align-items: center;
    gap: 0.4rem;
    .card-buttons {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 1em;
      justify-content: space-between;
    }
    .user-name {
      text-align: center;
      font-weight: 500;
    }
    .user-amount-debt {
      color: #4f46e5;
    }
  }
}

@media (max-width: 800px) {
  .card {
    &-icon {
      :deep(svg) {
        width: 3em;
        height: 3em;
      }
    }
    &-info {
      font-size: 0.7rem;
    }
  }
}
</style>
