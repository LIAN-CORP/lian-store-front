<script lang="ts" setup>
definePageMeta({
  layout: "blank",
});
const attributionModal = ref(false);
const { locale } = useI18n();
const activeLanguage = ref();
const languages = ref([
  { unicode: "🇨🇴", code: "es" },
  { unicode: "🇬🇧", code: "en" },
]);

function onShowAttributionModal() {
  attributionModal.value = true;
}

const activeForm = ref("login");

function onChangeForm(name: string) {
  activeForm.value = name;
}
</script>

<template>
  <section class="background">
    <div class="auth">
      <h2>Lian Corp</h2>
      <div class="auth-content">
        <AuthLogin v-if="activeForm === 'login'" @showRegister="onChangeForm" />
        <AuthRegister
          v-if="activeForm === 'register'"
          @showLogin="onChangeForm"
        />
      </div>
      <div class="auth-actions">
        <Button
          variant="text"
          :label="$t('auth.attribution.button')"
          @click="onShowAttributionModal"
        />
      </div>
    </div>
  </section>
  <Dialog
    modal
    :header="$t('auth.attribution.title')"
    v-model:visible="attributionModal"
  >
    <template #default>
      <p>
        {{ $t("auth.attribution.label") }}
        <a target="_blank" href="https://bgjar.com">BGJar</a>
      </p>
    </template>
  </Dialog>
</template>

<style lang="scss" scoped>
.background {
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../public/login.svg");
  background-size: cover;
  height: 100vh;
  width: 100vw;
  padding: 1rem;
  .auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    min-width: 400px;
    background-color: white;
    box-shadow: 0px 0px 10px -3px rgba(66, 68, 90, 1);
    &-actions {
      display: flex;
    }
    h2 {
      font-family: "LibreBarCode128";
      font-size: 5em;
      text-align: center;
    }
  }
}

@media (max-width: 500px) {
  .background {
    .auth {
      min-width: 250px;
      h2 {
        font-family: "LibreBarCode128";
        font-size: 4em;
        text-align: center;
      }
    }
  }
}
</style>
