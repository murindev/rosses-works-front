<template>
    <div>
        <header-main :title="title">
            <template v-slot:left>
                <nuxt-link to="/users">
                    <Button transparent class="flat" size="s">В список</Button>
                </nuxt-link>
                <i class="spacer large gray"></i>
                <Button transparent class="flat" size="s">Поменять статус</Button>
            </template>
        </header-main>


        <div>
            <div class="fmm-panel-bar solo">
                <div class="fmm-panel-left">
                    <h2>
                        <span v-if="userProfile.name">{{userProfile.name}}</span>
                        <span v-if="userProfile.patronymic">{{userProfile.patronymic}}</span>
                        <span v-if="userProfile.surname">{{userProfile.surname}}</span>

                    </h2>
                    <span class="h-tag h-tag-bg-blue">Кандидат в мастера</span>
                </div>
                <span class="fmm-panel-right" @click="showUserPhoto">
                        <Avatar type="male" src="https://avavatar.ru/images/full/7/IyfaW4OxQfSq449g.jpg" shape="square"
                                noInfo></Avatar>
                    </span>
            </div>
            <Row :space="10">
                <Cell width="12">
                    <div class="h-panel">
                        <div class="h-panel-bar">
                            <span class="h-panel-title">Основное</span>
                        </div>
                        <div class="h-panel-body">
                            <div class="h-form-item" >

                                <template v-for="item in formData">
                                    <form-field-flat :data="item.value" :label="item.label" :details="item.details" :readonly="true"/>
                                </template>

                            </div>

                        </div>
                    </div>

                </Cell>
                <Cell width="12">
                    <Row :space="10">
                        <Cell>
                            <div class="h-panel">
                                <div class="h-panel-bar">
                                    <span class="h-panel-title">Образование</span>
                                    <span class="h-panel-right"><a>Основное</a></span>
                                </div>

                                    <template v-for="education in userProfile.education">
                                        <div class="h-panel-body">
                                        <template v-for="(value,key) in education" v-if="profileColumns.education.hasOwnProperty(key)">
                                            <form-field-flat :data="value" :label="profileColumns.education[key]" :readonly="true"/>
                                        </template>
                                        </div>
                                    </template>

                            </div>
                        </Cell>
                        <Cell>
                            <div class="h-panel">
                                <div class="h-panel-bar">
                                    <span class="h-panel-title">Трудовая деятельность</span>
                                    <span class="h-panel-right"><a>Укажите в обратном хронологическом порядке 5 последних мест Вашей работы:</a></span>
                                </div>
                                <template v-for="education in userProfile.employments">
                                    <div class="h-panel-body">
                                        <template v-for="(value,key) in education" v-if="profileColumns.employment.hasOwnProperty(key)">
                                            <form-field-flat :data="value" :label="profileColumns.employment[key]" :readonly="true"/>
                                        </template>
                                    </div>
                                </template>
                            </div>
                        </Cell>
                    </Row>

                </Cell>
            </Row>
        </div>


<!--        <div v-for="(r,k) in profileColumns">
            <span v-if="r">
                {{r}} - {{k}}
            </span>

        </div>-->




    </div>
</template>

<script lang="ts">
    import {Component, Vue, namespace} from 'nuxt-property-decorator'
    import HeaderMain from '~/components/_tpl/HeaderMain.vue'
    import {IUserProfile, IUserProfileColumns} from "~/types/user";
    import FormFieldFlat from "~/components/_tpl/forms/FormFieldFlat.vue";

    const profile = namespace('users/profile')

    @Component({
        components: {FormFieldFlat, HeaderMain}
    })
    export default class UsersProfilePage extends Vue {
        public title: string = 'Профиль пользователя'

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

        @profile.State('profileColumns') profileColumns!: IUserProfileColumns
        @profile.Action('fetchProfileColumns') fetchProfileColumns!: () => void
        private once = true;

        @profile.State('profile') userProfile!: IUserProfile
        @profile.Action('showProfile') showProfile!: (id: number) => void


        showUserPhoto() {
            this.$Modal({
                content: `<img src='https://avavatar.ru/images/full/7/IyfaW4OxQfSq449g.jpg' width='600'/>`,
                buttons: []
            });
        }

        formData: {
            label?: string
            details?: string
            value?: any
        }[] = []


         formInit(){
            // console.log(this.profileColumns['profile']);
             Object.keys(this.profileColumns.profile).forEach(i => {
                if(this.profileColumns.profile[i as keyof IUserProfile]){
                    // @ts-ignore
                    let lStr = this.profileColumns.profile[i as keyof IUserProfile].split(':');
                    this.formData.push({
                        label: lStr[0],
                        details: lStr[1] ? lStr[1] : '',
                        value: this.userProfile.hasOwnProperty(i) ? this.userProfile[i as keyof IUserProfile] : ''
                    })
                }
            })
            // return  str.split(':')
        }


        async mounted() {


            // if (this.once)
            await this.fetchProfileColumns()
            await this.showProfile(Number(this.$route.params.id))

            await this.formInit()

        }
    }
</script>
