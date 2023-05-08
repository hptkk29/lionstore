import colors from 'vuetify/es5/util/colors'

export default {

  publicRuntimeConfig: {
    APP_API_URL   : process.env.APP_API_URL,
    APP_URL       : process.env.APP_URL
  },

  env: {
    APP_API_URL: process.env.APP_API_URL,
    APP_URL    : process.env.APP_URL
  },

  telemetry: false,
  srcDir: "./resources",
  server: {
    port: 8000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Online Shopping Platform',
    title: 'LionStore',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: "theme-color", content: "#fff" }

    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/droidarabickufi.css' },  
    ]
  },

  loading: { 
    color: '#3d5afe',
    continuous: true
  },

  router: {
    middleware: ['locale']
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/app.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios',
    '~/plugins/bootstrap',
    '~/plugins/helpers',
    '~/plugins/i18n',
    '~/plugins/jsonld',
    '~/plugins/mask',
    '~/plugins/pixel',
    '~/plugins/tiktok',
    '~/plugins/snapchat',
    '~/plugins/gtm',
    { src: '~/plugins/countdown', mode: 'client' },
    { src: '~/plugins/editor', mode: 'client' },
    { src: '~/plugins/echarts', mode: 'client' },
    { src: '~/plugins/confirm', mode: 'client' },
    { src: '~/plugins/toast', mode: 'client' },
    { src: '~/plugins/swiper', mode: 'client' },
    { src: '~/plugins/picker', mode: 'client' },
    { src: '~/plugins/zoomer', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/router',
    '@nuxtjs/device'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    '@nuxtjs/recaptcha'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: `${process.env.APP_API_URL}/`
  },

  /*
  ** Auth for nuxt
  ** See https://auth.nuxtjs.org/options
  */
  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type    : 'Bearer',
          maxAge  : 60 * 60 * 24 * 30,
          global  : true
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/account', method: 'post', propertyName: false }
        },
        autoLogout: false
      }
    },
    redirect: {
      login   : '/',
      logout  : '/',
      callback: '/',
      home    : false
    },
    cookie: {
      options: {
        maxAge: 60 * 60 * 24 * 30,
        secure: false
      }
    },
    localStorage: false,
    resetOnError: true,
    watchLoggedIn: true,
    plugins: ['~/plugins/auth.js'],
  },

  recaptcha: {
    hideBadge: false,
    siteKey  : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    language : 'en',
    version  : 2,
    size     : ''
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'vue-echarts',
      'echarts/core',
      'echarts/renderers',
      'echarts/charts',
      'echarts/components',
      'zrender'
    ],
    extend(config, ctx) {
      config.externals = {
        jquery: 'jQuery'
      };
    }
  }
}
