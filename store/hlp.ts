import {store} from "~/store/index";

import {VuexModule, Module, Mutation, Action, MutationAction} from 'vuex-module-decorators'

import { $axios } from "~/utils/api";
import {IHRegion} from "~/types/h";



@Module({
    dynamic: true, store,
    name: 'hlp',
    stateFactory: true,
    namespaced: true,
})
export default class Hlp extends VuexModule {

// regions
    public regions:IHRegion[] = []
    @Mutation setRegions(payload: IHRegion[]){this.regions = payload}
    @Action({commit: 'setRegions'}) async indexRegions() {
        return await $axios.$post(process.env.serverApi+'helper-region-index')
    }
    @Action({commit: 'setRegions'}) async storeRegions(obj:any) {
        return await $axios.$get(process.env.serverApi+'helper-region-store')
    }
    @Action({commit: 'setRegions'}) async destroyRegions(obj:any) {
        return await $axios.$get(process.env.serverApi+'helper-region-destroy')
    }


}
