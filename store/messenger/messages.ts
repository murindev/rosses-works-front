import {store} from "~/store";

import {VuexModule, Module, Mutation, Action, MutationAction} from 'vuex-module-decorators'

import { $axios } from "~/utils/api";

@Module({
    dynamic: true, store,
    name: 'messages',
    stateFactory: true,
    namespaced: true,
})
export default class Messages extends VuexModule {

    public messageState!: boolean
    @Mutation setMessageState(payload:boolean){this.messageState = payload}


// to custom groups simple ------------------------------------------------------------------
    @Action({commit: 'setMessageState'}) async simpleCustomGroups(groups:number[],message: string) {
        return await $axios.$post(process.env.serverApi+'messages-SimpleCustomGroups',{groups, message})
    }

// private simple ------------------------------------------------------------------
    @Action({commit: 'setMessageState'}) async simplePrivate(payload: Object) {
        return await $axios.$post(process.env.serverApi+'message/simplePrivate', payload )
    }

/*// index ------------------------------------------------------------------
    public privateUserUpdate = {}
        @Mutation setPrivateUserUpdate(payload?:any){this.privateUserUpdate = payload}
        @Action({commit: 'setprivateUserUpdate'}) async indexPrivateUserUpdate() {
            return await $axios.$post(process.env.serverApi+'messages-privateUserUpdate')
        }*/

// index ------------------------------------------------------------------
// store ------------------------------------------------------------------
// show ------------------------------------------------------------------
// destroy ------------------------------------------------------------------
// Sample ------------------------------------------------------------------
}
