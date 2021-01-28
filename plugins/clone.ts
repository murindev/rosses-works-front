import Vue from "vue";

const cloneDeep = require('lodash.clonedeep');

declare module 'vue/types/vue' {
    interface Vue {
        $clone(a:any): any
    }
}

Vue.prototype.$clone = cloneDeep
