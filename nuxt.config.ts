// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/apollo',
        '@nuxtjs/google-fonts',
        '@vee-validate/nuxt'
    ],
    devtools: {
        enabled: true
    },
    vue: {
        defineModel: true
    },
    components: {
        pathPrefix: false
    },
    apollo: {
        clients: {
            default: {
                httpEndpoint: process.env.NODE_ENV === 'production' ? process.env.GQL_PROXY_PROD : process.env.GQL_PROXY_DEV,
            }
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/css/_usage.scss" as *;'
                }
            }
        }
    },
    googleFonts: {
        families: {
            Roboto: true
        },
        subsets: 'cyrillic'
    },
    css: ['assets/css/reset.scss', 'assets/css/_globals.scss'],
    build: {
        transpile: ['tslib']
    },
    routeRules: {
        '/api':{ proxy:  process.env.GQL_URL }
    }
})
