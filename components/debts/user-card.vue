<script setup lang="ts">
import { Icon } from "@iconify/vue/dist/iconify.js";

import { formatAmount } from "#imports";

defineProps<{
  name: string;
  amount: number;
}>();
const emit = defineEmits(["searchDebt"]);
function onSearchDebt() {
  emit("searchDebt");
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

        <div class="card-buttons">
          <Button class="button" rounded @click="onSearchDebt">
            <template #icon>
              <Icon
                icon="solar:card-search-linear"
                width="1.5rem"
                height="1.5rem"
              />
            </template>
          </Button>
          <Button class="button" severity="info" rounded @click="onSearchDebt">
            <template #icon>
              <Icon
                icon="material-symbols:edit-square-outline"
                width="1.5em"
                height="1.5em"
                style="color: #fff"
              />
            </template>
          </Button>
        </div>
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
  &-buttons {
    display: flex;
    gap: 1rem;
  }
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
    padding: 0.5rem;
    justify-items: center;
    align-items: center;
    gap: 0.4rem;
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
