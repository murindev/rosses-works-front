<template>
    <div>
        <header-main :title="title">
            <template v-slot:left>
                <i class="spacer gray"></i>
                <input type="text" v-model="priv">
                <Button transparent class="flat" size="s" @click="sendPrivateMess">Персональное</Button>
                <i class="spacer gray"></i>
                <input type="text" v-model="fackUp">
                <i class="spacer gray"></i>
                <Button transparent class="flat" size="s" @click="sendMess">Публичное</Button>
            </template>
        </header-main>



        <div style="height:200px; background: #999999">

{{tt}}



        </div>





        <div class="table-fix">
            <table>
                <thead>
                <tr>
                    <th v-for="i in cols">
                        <div content="ID"><span>Description</span>
                            <span class="h-table-sort-handler"><span
                                class="h-table-sort-desc"><i class="h-icon-down"></i></span></span>
                        </div>
<!--                        <div style="padding:4px 0;"><input type="text"/></div>-->
                    </th>
                </tr>

                </thead>
                <tbody>
                <tr v-for="(row,k) in 100">

                    <td v-for="i in cols"> {{k}} - These are red.
                        <button class="h-btn h-btn-s"><i class="h-icon-edit"></i></button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>

</template>

<script lang="ts">
    import {Component, Vue, namespace} from 'nuxt-property-decorator'
    import HeaderMain from "~/components/_tpl/HeaderMain.vue";

    const some = namespace('some')
    import { NullPresenceChannel } from 'laravel-echo/src/channel'

    @Component({
        components: {HeaderMain}
    })
    export default class IndexPage extends Vue {
        public title: string = 'Ваши персональные данные'

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

        tt = '222'
        fackUp = '';
        priv = '';

        cols = 8

        sider = false

        menuDatas = [
            {title: 'Home', key: 'welcome', icon: 'h-icon-home'},
            {title: 'Inquire', key: 'search', icon: 'h-icon-search'},
            {
                title: 'Collection',
                key: 'favor',
                icon: 'h-icon-star',
                count: 100,
                children: [{title: 'Collection-1', key: 'favor2-1'}]
            },
            {title: 'task', icon: 'h-icon-task', key: 'task'}
        ]

        year = (new Date()).getFullYear();
        headerFixed = true;
        datas = [
            {icon: 'h-icon-home'},
            {
                title: 'Component',
                icon: 'h-icon-complete',
                route: {name: 'Component'}
            },
            {title: 'Breadcrumb', icon: 'h-icon-star'}
        ]

        sendMess(){
            this.$axios.$get(process.env.serverApi+'message?message='+this.fackUp)
        }

        sendPrivateMess(){
            this.$axios.$post(process.env.serverApi+'message/simplePrivate', {
                user: 78,
                message: this.priv
            })
        }

        mounted() {

            this.$echo.private(`App.User.${this.$user.id}`)
                .listen('PrivateEvent', (e:any) => {
                    console.log('PrivateEvent',e);
                });

            this.$echo.channel('message')
                .listen('MessageSend', (e:any) => {
                    console.log('llllllllllll',e);
                    this.tt = e
                })
        }


    }
</script>

<style>
/*
    .fixed_headers {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
    }

    .fixed_headers th {
        text-align: left;
        height: 40px;
        position: relative;
    }

    .fixed_headers th,
    .fixed_headers td {
        overflow: hidden;
        height: 40px;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        box-sizing: border-box;
        padding: 3px 0px 3px 8px;
        vertical-align: middle;
        width: auto;
        min-width: 20px;
    }

    .fixed_headers td {
        font-size: 13px;
        height: 40px;
        border-top: 1px solid #eeeeee;
    }

    .fixed_headers thead {
        background: rgba(69, 185, 132, 0.15);
        position: relative;
        overflow: hidden;
        border-bottom: 1px solid #eeeeee;
    }

    .fixed_headers thead tr {
        display: block;
        position: relative;
    }

    .fixed_headers tbody {
        display: block;
        overflow: auto;
        width: 100%;
        height: 300px;
    }

    .fixed_headers tbody tr:nth-child(even) {
        background-color: #ddd;
    }
*/

    /*.old_ie_wrapper {*/
    /*    height: 300px;*/
    /*    width: 750px;*/
    /*    overflow-x: hidden;*/
    /*    overflow-y: auto;*/
    /*}*/
    /*.old_ie_wrapper tbody {*/
    /*    height: auto;*/
    /*}*/


    .tableFixHead {
        overflow: auto;
        height: 400px;
        position: relative;
    }

    .tableFixHead thead th {
        position: sticky;
        z-index: 1;
        background: #d6eae4;
        overflow: visible;
    }
    .tableFixHead thead th:before {
        content: '';
        display: block;
        width: 100%;
        position: absolute;
        top: -1px;
        left: 0px;
        height: 1px;
        background: #d6eae4;
    }

    .tableFixHead thead tr:nth-of-type(1) th {
        top: 0;
    }

    .tableFixHead table {
        border-collapse: collapse;
        width: 100%;
    }

    .tableFixHead th,
    .tableFixHead td {
        overflow: hidden;
        height: 40px;
        text-overflow: ellipsis;
        word-break: break-all;
        box-sizing: border-box;
        padding: 3px 0px 3px 8px;
        vertical-align: middle;
        width: auto;
        min-width: 20px;
        white-space: nowrap;
        border-top: 1px solid #ecebeb;
    }

    .tableFixHead tbody tr {
        background: #ffffff;
    }

    .tableFixHead tbody tr:hover {
        background: #eee;
    }
</style>

