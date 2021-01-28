<template>
    <div>
        <header-main :title="title">
            <template v-slot:left>
                <Button transparent class="flat" size="s" @click="add()">Добавить роль</Button>
                <!--        @TODO-uretral:  -> Добавить редактирование разрядов        -->
            </template>
        </header-main>

        <Table ref="table" :datas="rows" :height="this.$cardInner()" class="fmmTable-header-green">

            <template v-for="column in columns">

                <TableItem v-if="column.prop === 'active'" :title="column.title" :sort="column.sort">
                    <template slot-scope="{data}">
                        <i v-if="data.active" class="h-icon-check green-color"/>
                        <i v-else class="h-icon-minus gray-color"/>
                    </template>
                </TableItem>

                <TableItem v-else :title="column.title" :prop="column.prop" :sort="column.sort"/>
            </template>

            <TableItem title="Разряды"  align="center">
                <template slot-scope="{data}"></template>
            </TableItem>

            <TableItem title="Действия" :width="100" align="center">
                <template slot-scope="{data}">
                    <button class="h-btn h-btn-s" @click="edit(data)"><i class="h-icon-edit"/></button>
                    <button v-if="$admit([1])" class="h-btn h-btn-s" @click="destroy(data)"><i class="h-icon-trash"/></button>
                </template>
            </TableItem>

            <div slot="empty">Данных нет</div>
        </Table>


        <Modal class="actModal" v-model="formModal" :hasCloseIcon="true" type="drawer-right">
            <crud-form :columns="crudFormColumns" :action="crudFormAction"/>
        </Modal>


    </div>
</template>

<script lang="ts">
    import {Vue, Component, namespace, Watch} from 'nuxt-property-decorator'
    import {IUser, IUserRole} from "~/types/user";

    const user = namespace('users/user')

    import HeaderMain from "~/components/_tpl/HeaderMain.vue";
    import CrudForm from "~/components/_tpl/forms/CrudForm.vue";
    import {ICrudForm, IEmptyObject} from "~/types/_service";

    @Component({
        components: {HeaderMain, CrudForm}
    })
    export default class UserRolesPage extends Vue {

        // PAGE
        public title: string = 'Роли пользователей'
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

        public user!:IUser

        //STORE

        @user.State('userRoles') userRoles!: IUserRole[]
        @user.Action('indexUserRole') indexUserRole!: () => void
        @user.Action('storeUserRole') storeUserRole!: (role: IUserRole) => void
        @user.Action('destroyUserRole') destroyUserRole!: (role: IUserRole) => void

        //ENGINE

        public columns: ICrudForm[] = [
            {title: 'ID', prop: 'id', value: null, edit: false},
            {title: 'Активность', prop: 'active', value: 1,  inputType: 'switch'},
            {title: 'Роль', prop: 'name', value: null, },
            {title: 'slug', prop: 'slug', value: null,},
        ]

        //TABLE
        rows: IUserRole[] = [];

        //FORM
        public formModal = false
        public crudFormAction: string = ''
        public crudFormColumns: IEmptyObject = {}

        async edit(row: IUserRole) {
            this.crudFormAction = 'edit'
            this.crudFormColumns = this.$clone(this.columns)
            await this.crudFormColumns.forEach((i:ICrudForm) => {
                if (row.hasOwnProperty(i.prop)) {
                    i.value = row[i.prop as keyof IUserRole]
                }
            })
            this.formModal = true
        }

        add() {
            this.crudFormAction = 'add'
            this.crudFormColumns = JSON.parse(JSON.stringify(this.columns))
            this.formModal = true
        }

        destroy(row: IUserRole) {
            this.$Confirm('Подтверждаете удаление,','Удаление')
                .then(async () => {
                    await this.destroyUserRole(row);
                    this.rows = await this.$clone(this.userRoles)
                    this.$Message({type:'success',text:'Удалено успешно'});
                })
                .catch(() => {
                    this.$Message({type:'error',text:'Произошла ошибка удаления'});
                });
        }

        async mounted() {
            await this.indexUserRole();
            this.rows = await this.$clone(this.userRoles);
            this.$nuxt.$on('crudFormSubmit', async (role:IUserRole) => {
                await this.storeUserRole(role)
                this.rows = await this.$clone(this.userRoles)
                this.formModal = false
            })

            this.user = this.$user

        }

    }
</script>
