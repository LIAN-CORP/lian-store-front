<script lang="ts" setup>
definePageMeta({
  layout: "blank",
});
const activeLanguage = ref();
const languages = ref([
  { unicode: "🇨🇴", code: "es" },
  { unicode: "🇬🇧", code: "en" },
]);
const { locale } = useI18n();

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
      <div class="select" v-if="activeForm !== 'register'">
        <Select
          :default-value="locale"
          size="small"
          v-model="activeLanguage"
          :options="languages"
          option-value="code"
          option-label="unicode"
          @change="$i18n.setLocale(activeLanguage)"
        >
          <template #option="slotProps">
            <div class="options-label">
              <span>{{ slotProps.option.unicode }}</span>
              <span>{{ slotProps.option.code.toUpperCase() }}</span>
            </div>
          </template>
        </Select>
      </div>
    </div>
    <p class="credits">
      {{ $t("auth.attribution.label") }}
      <a target="_blank" href="https://bgjar.com">BGJar</a>
    </p>
  </section>
</template>

<style lang="scss" scoped>
.background {
  display: grid;
  grid-template-rows: 1fr auto;
  place-items: center;
  background-image: url("../public/login.svg");
  background-size: cover;
  height: 100vh;
  width: 100vw;
  padding: 1rem;
  .credits {
    text-align: center;
    margin-top: auto;
    opacity: 0.6;
  }
  .select {
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
