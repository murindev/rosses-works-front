import {store} from "~/store";

import {VuexModule, Module, Mutation, Action, MutationAction} from 'vuex-module-decorators'
import {IUser, IUserRank, IUserRole} from "~/types/user";
import {$axios} from "~/utils/api";
import {IMainRequest} from "~/types/_service";


@Module({
    dynamic: true, store,
    name: 'user',
    stateFactory: true,
    namespaced: true,
})
export default class User extends VuexModule {

// USER ------------------------------------------------------------------
    public user!: IUser

    @Mutation
    setUser(payload: IUser) {
        this.user = payload
    }


    public users: IUser[] = []

    @Mutation
    setUsers(payload: IUser[]) {
        this.users = payload
    }

    @Action({commit: 'setUsers'})
    async indexUsers(payload: IMainRequest) {
        return await $axios.$post(process.env.serverApi + 'user-index', payload)
    }

    @Action({commit: 'setUsers'})
    async storeUser(user: IUser) {
        return await $axios.$post(process.env.serverApi + 'user-store', user)
    }


// ROLE index /store / show / destroy


    public userRole!: IUserRole

    @Mutation
    setUserRole(payload: IUserRole) {
        this.userRole = payload
    }

    // USER ROLES ----------------------------------
    public userRoles: IUserRole[] = []

    get getUserRoles() {
        return this.userRoles
    }

    @Mutation
    setUsersRoles(payload: IUserRole[]) {
        this.userRoles = payload
    }

    @Action({commit: 'setUsersRoles'})
    async indexUserRole() {
        return await $axios.$post(process.env.serverApi + 'user-role-index')
        // $axios. post(process.env.serverApi+'user/role/index')
    }


    @Action({commit: 'setUsersRoles'})
    async storeUserRole(payload: IUserRole) {
        return await $axios.$post(process.env.serverApi + 'user-role-store', payload)
    }

    @Action({rawError: true, commit: 'setUsersRoles'})
    async destroyUserRole(payload: IUserRole) {
        return await $axios.$post(process.env.serverApi + 'user-role-destroy', payload)
    }

// RANK --------------------------------------------------------------------------------------
    public userRanks: IUserRank[] = []

    @Mutation setUserRanks(payload: IUserRank[]) {
        this.userRanks = payload
    }

    @Action({commit: 'setUserRanks'})
    async indexUserRanks() {
        return await $axios.$post(process.env.serverApi + 'user-rank')
    }

// STAFF --------------------------------------------------------------------------------------

    @Action async userToStaff(user: IUser) {
         await $axios.$post(process.env.serverApi+'crm/user/userToStaff',user)
    }

    @Action async deactivateUser(user: IUser) {
         await $axios.$post(process.env.serverApi+'crm/user/deactivateUser',user)
    }

}
