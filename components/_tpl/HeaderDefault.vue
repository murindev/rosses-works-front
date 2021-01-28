<template>
    <v-app-bar app color="#3c8dbc" dense>
        <v-app-bar-nav-icon @click="$nuxt.$emit('mainDrawer')"/>

        <v-toolbar-title style="color: #f9f7e4">{{title}}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <slot name="left"></slot>
        <v-spacer></v-spacer>
        <slot name="right"></slot>
        <div class="mx-3"></div>
        <v-badge
                content="896"
                overlap
                offset-x="26"
                offset-y="26"
        >
            <v-btn icon>
                <v-icon color="#fff">mdi-account-clock</v-icon>
            </v-btn>
        </v-badge>
        <!--                        <div class="mx-1"></div>-->
        <v-badge
                content="896"
                overlap
                offset-x="26"
                offset-y="26"
        >
            <v-btn icon>
                <v-icon color="#fff">mdi-bell</v-icon>
            </v-btn>
        </v-badge>
    </v-app-bar>
</template>

<script lang="ts">
    import {Component, Vue, namespace, Prop} from 'nuxt-property-decorator'

    // const Example = namespace('Example')

    @Component
    export default class HeaderDefault extends Vue {
        @Prop() public title!: string
        public drawer: boolean = false;

        public group: boolean = false;

        public menu = [
            {
                action: 'mdi-ticket',
                access: [],
                items: [
                    {title: 'Звонки', page: ''},
                    {title: 'Лиды', page: ''}
                ],
                title: 'CRM',
            },
            {
                action: 'mdi-silverware-fork-knife',
                active: true,
                access: [],
                items: [],
                title: 'Логистика',
            },
            {
                action: 'mdi-school',
                items: [{title: 'Химия', page: ''}, {title: 'Оборудование', page: ''}, {title: 'Гараж', page: ''},],
                title: 'Склад',
            },
            {
                action: 'mdi-bottle-tonic-plus',
                items: [{title: 'List Item',page: ''}],
                title: 'Константы',
            },
            {
                action: 'mdi-account-multiple',
                title: 'Пользователи',
                items: [{title: 'Пользователи',page: '/users',},{title: 'Роли',page: '/users/roles',}],

                active: false
            },
        ]


        created() {
            this.$nuxt.$on('mainDrawer', () => this.drawer = !this.drawer)

        }
        mounted(){}
    }
</script>
