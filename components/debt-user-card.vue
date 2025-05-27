<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";
import type { DebtUserProps } from "~/interfaces/debt/entity/debtusercard.inferface";

defineProps<DebtUserProps>();
const emit = defineEmits(["searchDebt"]);
function onSearchDebt() {
  emit("searchDebt");
}

function formatAmount(amount: number): string {
  return amount.toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
</script>

<template>
  <div class="card-wrapper">
    <article class="card">
      <!-- Float Icon -->
      <div class="card-icon">
        <Icon icon="mingcute:user-4-fill" />
      </div>
      <div class="nothing"></div>

      <div class="card-info">
        <!-- Card Info -->
        <h2 class="user-name">{{ name }}</h2>
        <h3 class="user-amount-debt">${{ formatAmount(amount) }}</h3>
        <!-- Button Details -->
        <Button class="button" label="ver" @click="onSearchDebt">
          <template #icon>
            <Icon
              icon="solar:card-search-linear"
              width="1.5rem"
              height="1.5rem"
            />
          </template>
        </Button>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.card-wrapper {
  padding: 2rem 0rem 0rem;
}

.card {
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: 0px 5px 14px 1px rgba(0, 0, 0, 0.25);
  justify-items: center;
  align-items: center;
  width: 100%;
  position: relative;

  &-icon {
    position: absolute;
    color: #273e91;
    top: -2rem;
    padding: 0.15rem;
    border-radius: 50%;
    background-color: #ffffff;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);

    :deep(svg) {
      display: block;
      width: 4em;
      height: 4em;
    }
  }
  .nothing {
    background-color: #273e91;
    width: 100%;
    border-radius: 1rem 1rem 0 0;
    height: 2.5em;
  }

  &-info {
    display: flex;
    flex-direction: column;
    padding-bottom: 0.5rem;
    justify-items: center;
    align-items: center;
    gap: 0.4rem;
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
