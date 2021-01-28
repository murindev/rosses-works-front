import {store} from "~/store";

import {VuexModule, Module, Mutation, Action, MutationAction} from 'vuex-module-decorators'

import { $axios } from "~/utils/api";

@Module({
    dynamic: true, store,
    name: 'assistant',
    stateFactory: true,
    namespaced: true,
})
export default class Assistant extends VuexModule {
// tablesComments ------------------------------------------------------------------
    public tablesComments = []
    @Mutation setTablesComments(payload:[]){this.tablesComments = payload}
    @Action({commit: 'setTablesComments'}) async fetchTablesComments(data:[]) {
        return await $axios.$post(process.env.serverApi+'assistant',{
            func:'columnComments',
            data: data
        })
    }
}
