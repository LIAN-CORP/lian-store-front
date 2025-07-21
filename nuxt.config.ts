// https://nuxt.com/docs/api/configuration/nuxt-config
import { customPreset } from "./theme/theme.preset";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: "",
    },
  },
  modules: ["@primevue/nuxt-module", "@nuxtjs/i18n"],
  css: ["/assets/styles/main.scss"],

  i18n: {
    defaultLocale: "es",
    locales: [
      { code: "es", name: "Spanish", file: "es.json" },
      { code: "en", name: "English", file: "en.json" },
    ],
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  imports: {
    dirs: ["composables", "composables/**"],
  },
  primevue: {
    autoImport: false,
    components: {
      include: [
        "Button",
        "DataTable",
        "Column",
        "Menubar",
        "Dialog",
        "Form",
        "FloatLabel",
        "InputNumber",
        "Message",
        "InputText",
        "Select",
        "Textarea",
        "FileUpload",
        "InputGroup",
        "InputGroupAddon",
        "DataView",
        "Paginator",
        "IftaLabel",
        "DatePicker",
        "Toast",
        "ConfirmDialog",
        "Checkbox",
        "FormField",
        "ProgressSpinner",
      ],
    },
    options: {
      theme: {
        preset: customPreset,
        options: {
          darkModeSelector: false || "none",
        },
        cssLayer: {
          name: "primevue",
          order: "app-styles, primevue",
        },
      },
    },
  },
});
