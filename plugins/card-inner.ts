import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $cardInner(): number
    }
}

Vue.prototype.$cardInner = () => Math.floor((window.innerHeight - (80)))
