import {store,  cookieparser} from "~/store/index";
import {VuexModule, Module, Mutation, Action, MutationAction} from 'vuex-module-decorators'
import {$axios} from "~/utils/api";

@Module({
    dynamic: true, store,
    name: 'auth',
    stateFactory: true,
    namespaced: true,
})
export default class Auth extends VuexModule {

    public JWT: any = null;

    @Mutation
    public setJWT(JWT: string) {
        this.JWT = JWT
    }

    @Action async logout(){
        await $axios.$post(process.env.serverApi+'auth/logout')
    }
}
