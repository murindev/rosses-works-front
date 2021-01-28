<template>
    <div>
        <client-only>
            <nuxt/>
        </client-only>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator'
    // import { namespace } from 'vuex-class'
    // import * as moment from 'moment';
    // const ex = namespace('Example')

    @Component
    export default class LoginLayout extends Vue {

    }
</script>
