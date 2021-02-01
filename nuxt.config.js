export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "spa", //spa mode memungkinkan middleware berjalan di client side, sedangkan universal middleware berjalan di server side
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title:
      process.env.npm_package_name ||
      "Undergraduate Thesis - Summarize Article",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "title",
        name: "title",
        content:
          process.env.npm_package_description ||
          "This is my Undergraduate Thesis, you can write your article and we will summarize for you and the other people who need."
      },
      {
        property: "twitter:card",
        content: "summary_large_image"
      },
      {
        property: "twitter:url",
        content: "https://metatags.io/"
      },
      {
        property: "twitter:title",
        content: "Undergraduate Thesis - Summarize Article"
      },
      {
        property: "twitter:description",
        content:
          "This is my Undergraduate Thesis, you can write your article and we will summarize for you and the other people who need."
      },
      {
        property: "twitter:image",
        content:
          "https://s3-id-jkt-1.kilatstorage.id/nanas-experience/victor/meta_tag.PNG"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Global CSS
   */
  css: ["~/assets/style/main.scss"],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ["~/plugins/textPreprocessing", "~/plugins/axios"],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "@nuxt/typescript-build",
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL:
      process.env.BASE_URL || "https://api-openmind.victorycq.site/api/v1"
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    //ini untuk handle error depndency was not found "* fs in ./node_modules/natural/lib/natural/classifiers/classifier.js," (handle error library natural)
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: "empty",
        child_process: "empty"
      };
    }
  },
  server: {
    port: 8000, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL
  },
  privateRuntimeConfig: {
    apiSecret: process.env.API_SECRET
  }
};
