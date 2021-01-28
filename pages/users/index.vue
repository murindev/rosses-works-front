<template>
    <div>
        <header-main :title="title">
            <template v-slot:left>
                <Button transparent class="flat" size="s" @click="add()">Добавить</Button>
            </template>
        </header-main>
        <f-table
                :rows="ROWS"
                :columns="columns"
                :sorts="sorts"
                :height="this.$cardInner()"
                :counter="false"
                className="table-fix"
        >
            <template v-slot:th>
                <th v-if="$admit([1])"><i class="h-icon h-icon-star-on" v-tooltip content="Добавить/удалить - штат"></i>
                </th>
                <th><i class="h-icon h-icon-users" v-tooltip content="Профиль"></i></th>
                <th><i class="h-icon h-icon-message" v-tooltip content="Приватное сообщение"></i></th>
                <th><i class="h-icon h-icon-edit" v-tooltip content="Редактировать"></i></th>
                <th v-if="$admit([1])"><i class="h-icon h-icon-trash" v-tooltip content="Удалить"></i></th>

            </template>

            <template v-slot:td="{row}">
                <td class="center" v-if="$admit([1])">
                    <button class="h-btn h-btn-s" @click="addToStaff(row)">
                        <i v-if="row.crm_id !== 0" class="h-icon-star-on"/>
                        <i v-else class="h-icon-star"/>
                    </button>
                </td>
                <td class="center">
                    <NuxtLink :to="`/users/profiles/${row.profile.id}`" v-if="row.profile">
                        <button v-if="$admit([1])" class="h-btn h-btn-s"><i class="h-icon-users"/></button>
                    </NuxtLink>
                </td>
                <td class="center">
                    <button class="h-btn h-btn-s" @click="$nuxt.$emit('privateMessageModal',row)"><i
                            class="h-icon-message"/></button>
                </td>
                <td class="center">
                    <button class="h-btn h-btn-s" @click="edit(row)"><i class="h-icon-edit"/></button>
                </td>
                <td class="center" v-if="$admit([1])">
                    <button class="h-btn h-btn-s" @click="destroy(row)"><i class="h-icon-trash"/>
                    </button>
                </td>


            </template>
        </f-table>


        <Modal class="actModal" v-model="formModal" :hasCloseIcon="true" type="drawer-right">
            <f-table-form :columns="columns" :action="crudFormAction"></f-table-form>
        </Modal>


        <PrivateMessage/>


        <!--        <Modal class="actModal" v-model="modalMessageToCustomGroups" :hasCloseIcon="true">
                    <div slot="header">Сообщение в группу</div>
                </Modal>-->

    </div>
</template>

<script lang="ts">
    import {Vue, Component, namespace} from 'nuxt-property-decorator'

    import HeaderMain from "~/components/_tpl/HeaderMain.vue";
    import FTable from "~/components/_tpl/forms/FTable.vue";
    import FTableForm from "~/components/_tpl/forms/FTableForm.vue";

    const user = namespace('users/user')
    const assistant = namespace('tpl/assistant')
    const Hlp = namespace('hlp')


    import {IUser, IUserRank, IUserRole} from "~/types/user";
    import {ICrudForm, ICrudFormFilter, ICrudFormSort} from "~/types/_service";
    import {IHRegion} from "~/types/h";
    import PrivateMessage from "~/components/_tpl/messages/PrivateMessage.vue";


    @Component({
        components: {PrivateMessage, FTableForm, HeaderMain, FTable}
    })
    export default class UsersPage extends Vue {


// PAGE
        public title: string = 'Пользователи'

        public head() {
            return {
                title: this.title,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: 'Home page description'
                    }
                ],
            }
        }

//STORE
        @user.State('users') ROWS!: IUser
        @user.Action('indexUsers') indexROWS!: (sort?: object, filter?: object) => void
        @user.Action('storeUser') storeROW!: (user: IUser) => void

        @assistant.State('tablesComments') titles!: []
        @assistant.Action('fetchTablesComments') fetchTablesComments!: (arr: string[]) => void

        // additional ---------------------------

        @user.State('userRoles') userRoles!: IUserRole[]
        @user.Action('indexUserRole') indexUserRole!: () => void

        @user.State('userRanks') userRanks!: IUserRank[]
        @user.Action('indexUserRanks') indexUserRanks!: () => void
        @user.Action('userToStaff') userToStaff!: (user: IUser) => void
        @user.Action('deactivateUser') deactivateUser!: (user: IUser) => void

        @Hlp.State('regions') regions!: IHRegion[]
        @Hlp.Action('indexRegions') indexRegions!: () => void

//ENGINE
        // staff
        columns: ICrudForm[] = []

// =>   // staff edit
        setColumns() {
            let cols: ICrudForm[] = [ // changeable
                {
                    title: 'ID', class: 'center', prop: 'id', value: null, edit: false, width: 100,
                    filter: {value: null, condition: 'like'}
                },
                {
                    title: 'CRM', class: 'center', prop: 'crm_id', value: null, edit: false, width: 100,
                    filter: {value: null, condition: 'like'}
                },
                {
                    title: 'Активность', class: 'center', prop: 'active', value: 1,
                    input: {type: 'checkIcons', disabled: true},
                    filter: {
                        value: 1, condition: 'select', source: [{id: 0, name: 'нет'}, {id: 1, name: 'да'}]
                    }
                },
                {
                    title: 'Имя', prop: 'name', value: null, width: 120, required: true,
                    filter: {value: null, condition: 'like'}
                },
                {
                    title: 'Логин', prop: 'email', value: null,
                    filter: {value: null, condition: 'like'}
                },
                {
                    title: 'Регион', prop: 'city', value: null, input: {
                        type: 'select',
                        source: this.regions,
                        keyName: 'code',
                        titleName: 'region',
                        disabled: true,
                    },
                    filter: {
                        value: null,
                        condition: 'select',
                        source: this.regions.map(i => ({id: i.code, name: i.region}))
                    }
                },
                {
                    title: 'phone', prop: 'phone', value: null, input: {
                        type: 'phone'
                    },
                    filter: {value: null, condition: 'like'}
                },
                {
                    title: 'Роль', prop: 'roles', value: null, required: true, input: {
                        type: 'selectMultiply',
                        disabled: true,
                        source: this.userRoles,
                    },
                    filter: {
                        value: null, condition: 'selectInSet', source: this.userRoles
                    }
                },
                {
                    title: 'Разряд', prop: 'rank_id', value: null, required: true, input: {
                        type: 'select',
                        disabled: true,
                        source: this.userRanks
                    },
                    filter: {value: null, condition: 'select', source: this.userRanks}
                },
                {
                    title: 'График', prop: 'timeline', value: null, width: 120,
                    filter: {value: null, condition: 'like'}
                },
            ]

            this.$set(this.$data, 'columns', cols)
        }

        addToStaff(user: IUser) {
            this.$Confirm(`Подтверждаете ${user.crm_id ? 'деактивацию' : 'активацию учетной записи'}  ? `, '(Де)Активация учетной записи в CRM')
                .then(async () => {
                    if(user.crm_id){
                       await this.deactivateUser(user)
                       await this.mainRequest(user)
                    } else  {
                      await this.userToStaff(user)
                      await this.mainRequest(user)
                    }
                })
                .catch(() => {
                    console.log('catchhhhhh');
                })

        }



        // staff
        async mainRequest(data?: object) {
            if (this.columns.length) {
                await this.indexROWS({
                    sort: this.sorts,
                    filter: this.columns.reduce(function (acc: ICrudFormFilter[], c: ICrudForm) {
                        if (c.hasOwnProperty('filter')) {
                            acc.push({
                                key: c.prop,
                                condition: c.filter?.hasOwnProperty('condition') ? c.filter?.condition : '==',
                                value: c.filter?.hasOwnProperty('value') ? c.filter?.value : null
                            })
                        }
                        return acc
                    }, []),
                    data: data
                })
            }

        }


// TABLE
        // staff
        public sorts: ICrudFormSort = {
            key: 'id',
            direction: 'asc'
        }


//FORM
        public formModal = false
        public crudFormAction: string = ''

        async edit(row: object) {
            await this.columns.forEach((i: ICrudForm) => {
                if (row.hasOwnProperty(i.prop)) {
                    i.value = row[i.prop as keyof object]
                }
            })
            this.crudFormAction = 'edit'
            this.formModal = true
        }

        add() {
            this.crudFormAction = 'add'
            this.setColumns()
            this.formModal = true
        }

        destroy(row: object) {
            this.$Confirm('Подтверждаете удаление,', 'Удаление')
                .then(async () => {
                    // await this.destroyUserRole(row);
                    this.$Message({type: 'success', text: 'Удалено успешно'});
                })
                .catch(() => {
                    this.$Message({type: 'error', text: 'Произошла ошибка удаления'});
                });
        }


        async mounted() {

            this.$Loading();

// =>       // init store edit
            await this.indexRegions();
            await this.indexUserRole();
            await this.indexUserRanks();
            await this.fetchTablesComments(['users||all', 'user_profiles']);

            // staff
            await this.setColumns()

            // staff
            await this.mainRequest()

            // data from table
// =>       //staff edit interface
            this.$nuxt.$on('tableFormSubmit', async (user: IUser) => {
                await this.storeROW(user)
                await this.mainRequest()
                this.formModal = false
            })

            // data from form
            //staff
            this.$nuxt.$on('FTableSort', async (sorts: ICrudFormSort) => {
                this.$set(this.$data, 'sorts', sorts)
                await this.mainRequest()
            })
            this.$nuxt.$on('FTableFilter', async (columns: ICrudForm[]) => {
                this.$set(this.$data, 'columns', columns)
                await this.mainRequest()
            })

            this.$nuxt.$on('privateMessageModal', (val: boolean) => {
                this.$set(this.$data, 'simpleMessageModal', val)
            })

            // @ts-ignore
            this.$Loading.close();


        }

    }
</script>
