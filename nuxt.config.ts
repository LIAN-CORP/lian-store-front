// https://nuxt.com/docs/api/configuration/nuxt-config
import { customPreset } from "./theme/theme.preset";
import { process } from "std-env";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    preset: "cloudflare-pages",
  },
  runtimeConfig: {
    public: {
      apiGateway: process.env.API_GATEWAY,
    },
  },
  modules: ["@primevue/nuxt-module", "@nuxtjs/i18n", "@vee-validate/nuxt"],
  css: ["/assets/styles/main.scss"],

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },

  i18n: {
    defaultLocale: "es",
    lazy: true,
    langDir: "locales",
    locales: [
      {
        code: "es",
        name: "Spanish",
        files: [
          "es/auth.json",
          "es/common.json",
          "es/debtors.json",
          "es/inventory.json",
          "es/history.json",
          "es/transaction.json",
          "es/formError.json",
          "es/response.json",
        ],
      },
      {
        code: "en",
        name: "English",
        files: [
          "en/auth.json",
          "en/common.json",
          "en/debtors.json",
          "en/inventory.json",
          "en/history.json",
          "en/transaction.json",
          "en/formError.json",
          "en/response.json",
        ],
      },
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
        "InputMask",
        "Password",
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
