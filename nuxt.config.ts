// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],

  vueQuery: {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5,
        },
      },
    },
  },

  nitro: {
    prerender: {
      routes: ["/"],
      crawlLinks: true,
    },
  },

  routeRules: {
    "/products/**": { prerender: true },
  },

  devtools: { enabled: true },
  compatibilityDate: "2025-01-22",
});
