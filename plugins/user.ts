// @ts-ignore
import Cookies from 'js-cookie'
import {IUser} from "~/types/user";
import Vue from "vue";

declare module 'vue/types/vue' {
    interface Vue {
        $user: IUser
        $admit(access:number[]): boolean
    }
}

Vue.prototype.$user = {}
if(Cookies.get('user') !== undefined){
    new Promise( (resolve, reject) => { resolve(Cookies.get('user'))})
        .then( (val) => {
            // @ts-ignore
            return JSON.parse(val)})
        .then( (val:IUser) => {
            val.roles = val.roles?.map(i => Number(i))

            Vue.prototype.$admit= (access:number[]) => access.filter((x => val.roles?.includes(x))).length > 0;
            Vue.prototype.$user = val;
        });
}


