import {store} from "~/store";

import {VuexModule, Module, Mutation, Action, MutationAction} from 'vuex-module-decorators'

import { $axios } from "~/utils/api";
import {IUserProfile} from "~/types/user";



@Module({
    dynamic: true, store,
    name: 'user/profile',
    stateFactory: true,
    namespaced: true,
})
export default class Profile extends VuexModule {
// profile columns------------------------------------------------------------------
    public profileColumns = {}
    @Mutation setProfileColumns(payload:{}){this.profileColumns = payload}
    @Action({commit: 'setProfileColumns'}) async fetchProfileColumns() {
        return await $axios.$post(process.env.serverApi+'user-profile-columns')
    }

// profile ------------------------------------------------------------------
    public profile:IUserProfile = {}
    @Mutation setProfile(payload: IUserProfile){this.profile = payload}
    @Action({commit: 'setProfile'}) async showProfile(id:number) {
        return await $axios.$post(process.env.serverApi+'user-profile-show/'+id)
    }


    public profiles:IUserProfile[] = []
    @Mutation setProfiles(payload: IUserProfile[]){this.profiles = payload}
    @Action({commit: 'setProfiles'}) async indexProfile() {
        return await $axios.$post(process.env.serverApi+'user-profile-index')
    }
/*    @Action({commit: 'setRegions'}) async storeRegions(obj:any) {
        return await $axios.$get(process.env.serverApi+'user-profile-store')
    }
    @Action({commit: 'setRegions'}) async destroyRegions(obj:any) {
        return await $axios.$get(process.env.serverApi+'user-profile-destroy')
    }*/
   /* 'employment',
    'Трудовая деятельность',
    'Укажите в обратном хронологическом парядке 5 последних мест Вашей работы:',

                    'education',
                    'Образование',
                    'Основное:',

    */

// 888888 ------------------------------------------------------------------
// 888888 ------------------------------------------------------------------
// 888888 ------------------------------------------------------------------
// 888888 ------------------------------------------------------------------
// 888888 ------------------------------------------------------------------
// 888888 ------------------------------------------------------------------


// ROLE index /store / show / destroy 46.188.121.141


}
