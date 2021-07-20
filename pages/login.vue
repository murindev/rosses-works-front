<template>
    <div class="mod middle">
        <div class="mod-inner">
            <Form
                    class="fmm"
                    ref="form"
                    :validOnChange="true"
                    :rules="form.rules"
                    :model="form.model"
                    showErrorTip
            >
                <div class="h-panel h-panel-no-border">
                    <div class="h-panel-bar">
                        <span class="h-panel-title">Авторизация</span>
                        <div class="h-panel-right">
                            <Button color="primary" @click="submit">Вход</Button>
                        </div>
                    </div>
                    <div class="h-panel-body">

                        <FormItem label="Логин" prop="email" icon="h-icon-user" :required="true">
                            <input type="text" v-model="form.model.email">
                        </FormItem>
                        <FormItem label="Пароль" icon="h-icon-complete" prop="password" :required="true">
                            <input type="password" v-model="form.model.password">
                        </FormItem>
                    </div>
                </div>

            </Form>
        </div>
    </div>


</template>

<script lang="ts">

    const Cookie = process.client ? require('js-cookie') : undefined
    import {Component, Vue, namespace} from 'nuxt-property-decorator'


    const auth = namespace('auth')

    @Component({
        layout: 'login',
    })
    export default class LoginPage extends Vue {

        public form = {
            model: {
                email: null,
                password: null
            },
            rules: {
                email: {
                    minLen: 5
                },
                password: {
                    minLen: 5
                },
                required: ['email', 'password'],
            }

        }

        submits() {
            // @ts-ignore
            let validResult = this.$refs.form.valid();
            console.log('validResult', validResult);
            /*            this.form.isLoading = true;
                        let validResult = this.$refs.form.valid();
                        if (validResult.result) {
                            this.$Message('Successful verification');
                            setTimeout(() => {
                                this.isLoading = false;
                            }, 1000);
                        } else {
                            this.isLoading = false;
                        }*/
        }

        reset() {
            // this.$refs.form.resetValid();
        }


        @auth.State('JWT') JWT!: any
        @auth.Mutation('setJWT') setJWT!: (JWT: string) => void

        public valid: boolean = true
        public email: string = ''
        public password: string = ''

        public error401: boolean = false;

        public emailRules = [
            (v: string) => !!v || 'Поле обязательно для заполнения',
            (v: string) => /.+@.+\..+/.test(v) || 'Поле должно содержать валидный E-mail',
        ]

        public passwordRules = [
            (v: string) => v.length >= 6 || 'Длина пароля не менее 6 символов'
        ]

        async submit() {
            // @ts-ignore
            let validResult = this.$refs.form.valid();
            if (!validResult.result) {
                return false
            }

            try {
                let response = await this.$axios.$post(process.env.serverApi + 'auth/login', {
                    email: this.form.model.email,
                    password: this.form.model.password
                })
                await Cookie.set('JWT', response.access_token)
                await Cookie.set('user', response.user)
                await location.replace('/')
                this.error401 = false
            } catch (error) {
                this.$Message({
                    type: 'error',
                    text: 'Возможно вы неправильно ввели ЛОГИН или ПАРОЛЬ'
                })
            }

        }
    }
</script>
