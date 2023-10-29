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
                httpEndpoint: 'http://test.order.mnogo.menu/graphql/',
                httpLinkOptions: {
                    fetchOptions: {
                        mode: 'no-cors'
                    }
                }
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
        '/table/general': {cors: true},
        '/table/device': {cors: true},
        '/graph/general': {cors: true},
        '/graph/device': {cors: true},
    }
})
