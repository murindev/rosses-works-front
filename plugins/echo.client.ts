import { Plugin } from '@nuxt/types'
import Vue from 'vue'

import Echo from 'laravel-echo';

// @ts-ignore
import Cookies from 'js-cookie'


const echoClient = {};
// @ts-ignore
echoClient.install = function (Vue) {
    Vue.prototype.$pusher = require("pusher-js");
    Vue.prototype.$echo = new Echo({

        broadcaster: 'pusher',
        key: 2070,
        cluster: 'mt1',
        wsHost: '194.87.232.56',// '45.141.100.134' '194.87.232.56'
        wsPort: 6002,
        encrypted: false,
        disableStats: true,
        authEndpoint: 'http://194.87.232.56/broadcasting/auth',
        enabledTransports: ['ws'],
        auth: {
            headers: {
                Authorization: 'Bearer ' + Cookies.get('JWT'),
            }
        },
    });
};
// @ts-ignore
Vue.use(echoClient);

declare module 'vue/types/vue' {
    interface Vue {
        $echo: any
        $pusher: any
    }
}

