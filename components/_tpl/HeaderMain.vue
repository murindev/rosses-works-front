<template>
    <HHeader theme="dark" class="main-header">
        <Sider theme="dark" :siderFixed="true" class="main-sider" v-if="sider">
            <Menu className="h-menu-dark" :datas="menu" :inlineCollapsed="false"></Menu>
        </Sider>
        <div class="header-inner">
            <div class="header-inner-left">
                <Button icon="h-icon-menu" size="s" style="font-size: 18px" noBorder transparent
                        @click="sider = !sider"/>
                <i class="spacer"></i>
                <span>{{title}}</span>
                <i class="spacer"></i>
                <i class="spacer gray"></i>
                <slot name="left"></slot>
            </div>
            <div class="header-inner-center">
                <slot name="center"></slot>
            </div>
            <div class="header-inner-right">
                <slot name="right"></slot>
                <Button size="s" transparent no-border>
                    <Badge :count="24">
                        <i class="h-icon-link" style="font-size: 18px"></i>
                    </Badge>
                </Button>
                <i class="spacer gray large"></i>
                <Button size="s" transparent no-border>
                    <Badge :count="12">
                        <i class="h-icon-message" style="font-size: 18px"></i>
                    </Badge>
                </Button>
                <i class="spacer gray large"></i>
                <Button size="s" transparent no-border>
                    <Badge :count="8">
                        <i class="h-icon-task" style="font-size: 18px"></i>
                    </Badge>
                </Button>
                <i class="spacer"></i>

                <div class="user-menu">
                    <Menu :datas="userMenu" style="top:-10px"
                          :activeAll="false"
                          className="h-menu-dark"
                          :inlineCollapsed="false"
                          ref="menu"
                          :accordion="false"
                          @click="triggerClick"
                    />
                </div>


                <!--                      @select="triggerSelect"
                     -->
            </div>
        </div>
    </HHeader>

</template>

<script lang="ts">
    import {Component, Vue, namespace, Prop, Action} from 'nuxt-property-decorator'
    import {IHMenu} from "~/types/heyUI";
    import {IUser} from "~/types/user";
    const Cookie = process.client ? require('js-cookie') : undefined

    const auth = namespace('auth')


    @Component({
        components: {}
    })
    export default class IndexPage extends Vue {

        @Prop() title!: string
        sider = false
        // private user!: IUser

        @auth.Action('logout') logout!:() => void

        userMenu = [
            {
                title: this.$user.name,
                key: 'favor',
                icon: 'h-icon-user',
                children: [
                    {
                        title: 'Профиль',
                        key: 'user-profile',
                        icon: 'h-icon-home',
                    },
                    {
                        title: 'Выход',
                        key: 'logout',
                        icon: 'h-icon-outbox',
                    }
                ]
            },
        ]
        menu = [
            {
                title: 'CRM', key: 'CRM', icon: 'h-icon-home',
                children: [
                    {title: 'Звонки', key: 'calls', href: '/'},
                    {title: 'Лиды', key: 'lids', href: '/'},
                ]
            },
            {title: 'Логистика', key: 'logistic', icon: 'h-icon-location'},
            {
                title: 'Пользователи',
                key: 'favor',
                icon: 'h-icon-users',
                children: [
                    {title: 'Пользователи', key: 'users', href: '/users', nativeLink: true},
                    {title: 'Роли', key: 'users-roles', href: '/users/roles', nativeLink: true},
                ]
            },
        ]

        triggerClick(data:IHMenu) {
            switch (data.key) {
                case 'logout':
                    this.logout()
                    Cookie.remove('JWT')
                    Cookie.remove('user')
                    location.replace('/login')
                    break



            }
        }


        mounted(){
            // this.user = this.$user
        }


    }
</script>

