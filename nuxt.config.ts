// https://nuxt.com/docs/api/configuration/nuxt-config
import { customPreset } from "./theme/theme.preset";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@primevue/nuxt-module"],
  css: ["/assets/styles/main.scss"],
  primevue: {
    options: {
      theme: {
        preset: customPreset,
        darkModeSelector: false,
        cssLayer: {
          name: "primevue",
          order: "app-styles, primevue",
        },
      },
    },
  },
});
