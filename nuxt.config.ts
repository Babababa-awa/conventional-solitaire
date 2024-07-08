export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    buildAssetsDir: '/game/'
  },

  runtimeConfig: {
    public: {
      title: 'Conventional Solitaire',
    },
  },

  components: [
    '~/components',
    '~/components/controls',
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],

  typescript: {
    strict: true
  },

  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs',
    ],
  },

  ssr: false,

  target: 'static',

  compatibilityDate: '2024-07-07'
})
