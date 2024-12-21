// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: {
    // enabled: true
  },
  devtools: { enabled: false },
  pages: false,
  ssr: false,
  modules: [
    // '@nuxtjs/tailwindcss',
    // '@nuxt/eslint',
    '@nuxt/content',
    '@vite-pwa/nuxt',
  ],
  experimental: {
    watcher: 'poll',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    hot: true,
  },
  // routeRules: {

  // },
  pages: true,
  compatibilityDate: '2024-10-29',
});
