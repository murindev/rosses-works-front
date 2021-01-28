// import store from '@/store'
import Vuex from 'vuex'

const store = new Vuex.Store({})
import {VuexModule, Module, Mutation, Action, MutationAction} from 'vuex-module-decorators'

@Module({
    dynamic: true, store,
    name: 'some',
    stateFactory: true,
    namespaced: true,
})
export default class Some extends VuexModule {
    public test: string = 'initial'

    @Mutation
    public setTest(val: string) {
        this.test = val
    }
    public get getTest(){
        return this.test
    }
}
