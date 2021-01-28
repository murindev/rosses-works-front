import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $tel(tel:string): number
    }
}

Vue.prototype.$tel = (tel:string) => {
    if(tel){
        let s = tel.replace(/\D/g,'')
        return `+7 (${s.substr(1,3)}) ${s.substr(4,3)} ${s.substr(7,2)} ${s.substr(9,2)}`
    } else  {
        return ''
    }

}
