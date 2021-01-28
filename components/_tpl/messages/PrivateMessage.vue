<template>
    <Modal v-model="modal" class="actModal"  @input="close()" :hasCloseIcon="true">
        <Form v-if="user"  mode="block">
            <div class="h-panel h-panel-no-border">
                <div class="h-panel-bar">
                    <span class="h-panel-title">Персональное сообщение</span>
                </div>
                <div class="h-panel-body">
                    <FormItem label="Пользователь">
                        <input v-if="user !== undefined" type="text" v-model="user.name" disabled>
                    </FormItem>
                    <FormItem label="Сообщение">
                        <textarea v-model="message" style="height: 120px"></textarea>
                    </FormItem>
                </div>
                <div class="h-panel-footer right">
                    <Button color="primary" @click="send()">Отправить</Button>
                </div>
            </div>
        </Form>

    </Modal>
</template>

<script lang="ts">
    import {Component, Vue, namespace, Prop, Watch, Provide} from 'nuxt-property-decorator'
    import {IUser} from "~/types/user";

    const messages = namespace('messenger/messages')

    @Component({
        components: {}
    })
    export default class PrivateMessage extends Vue {

        public user: IUser = {id:0}
        public modal = false
        public message = '';

        @messages.State('messageState') messageState!: boolean
        @messages.Action('simplePrivate') simplePrivate!: (payload: Object) => void



        close(){
            this.user = {id:0}
        }


        public async send() {
            if(this.message){
               await this.simplePrivate({
                user: this.user.id, message: this.message
               })
            }
            this.modal = false;

        }

       mounted() {
           this.$nuxt.$on('privateMessageModal', (user: IUser) => {
                this.$set(this.$data, 'user', user)
                this.$set(this.$data, 'modal', true)
            })

        }
    }
</script>
