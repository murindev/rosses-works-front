import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $tableRowsPerPage(): number
    }
}


Vue.prototype.$tableRowsPerPage = () => Math.floor((window.innerHeight - (48 + 24 + 64))/48) - 1
