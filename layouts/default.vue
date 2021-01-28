<template>
    <client-only>
        <Layout  class="main-layout">
            <Content>
                <Nuxt/>
            </Content>
        </Layout>
    </client-only>

</template>

<script lang="ts">


    import {Component, Vue} from 'nuxt-property-decorator'


    @Component({
        // middleware: ['JWT']
    })
    export default class LayoutDefault extends Vue {

    }

</script>

<style>

</style>
