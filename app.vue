<template>
  <div>
    <Button label="verify" />
    <div class="card flex justify-center">
      <InputOtp v-model="value" :length="5" />
    </div>
  </div>
</template>

<style>
.algo {
  background-color: blue;
}
</style>
<script setup>
import { ref } from "vue";

const value = ref(null);
</script>
