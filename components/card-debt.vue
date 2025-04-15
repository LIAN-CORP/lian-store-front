<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>
<template>
  <div class="host">
    <article class="debt">
      <div class="debt-icon">
        <img
          class="debt-icon-img"
          src="/assets/images/person-icon.webp"
          alt="person"
        />
      </div>
      <div class="debt-info">
        <h4>ERICK ENRIQUE</h4>
        <h4>$150000</h4>
        <Button rounded>
          <template #icon>
            <Icon icon="solar:card-search-bold" width="1.5em" height="1.5em" />
          </template>
        </Button>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.host {
  padding: 0.5rem;
}
.debt {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  box-shadow: 0px 5px 14px 1px rgba(0, 0, 0, 0.25);
  &-icon {
    width: 100px;
    padding: 0.5rem;
    border-radius: 1rem;
    &-img {
      object-fit: contain;
      width: 100%;
    }
  }
  &-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    h4 {
      text-align: center;
    }
  }
}
</style>
