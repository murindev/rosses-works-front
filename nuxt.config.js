export default {
    ssr: false,
    server: {
        port: 7000, // default: 3000
        host: 'localhost' // default: localhost
    },
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'rosses-crm',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },


    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        "~/plugins/axios-accessor",
        "~/plugins/card-inner",
        "~/plugins/table-rows-per-page",
        '~/plugins/heyui.client',
        '~/plugins/clone',
        '~/plugins/user',
        '~/plugins/tel',
        // '~/plugins/echo.client',
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build'
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: ['@nuxtjs/axios', 'cookie-universal-nuxt','@nuxtjs/laravel-echo'],
    axios: {
        baseURL: process.env.SERVER_URL
    },
    echo: {
        plugins: [ '~/plugins/echo.client' ],
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {},

    env: {
        serverUrl: process.env.SERVER_URL,
        serverApi: process.env.SERVER_URL + 'api/',
    },

    auth: {
        localStorage: false,
        cookie: {
            options: {
                expires: 7
            }
        },
        strategies: {
            local: {
                endpoints: {
                    login: {url: '/token', method: 'post', propertyName: false},
                    logout: false,
                    user: {url: '/users/me', method: 'get', propertyName: false}
                }
            }
        },
        plugins: ['~/plugins/axios.js', {src: '~/plugins/auth.js', mode: 'client'}]
    },


    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [

        'heyui/themes/index.css',
        '@/assets/style/style.css',
    ],

}
