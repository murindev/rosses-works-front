<template>
    <div class="form-field flat">
        <Row :space="10" class="fmm-form-item-flat" >
            <Cell width="12" height="40"  :xs='xs_prop' :sm='sm_prop' :md='md_prop' :lg='lg_prop' :xl='xl_prop'>
                <label v-if="label">{{label}}
                    <i v-if="details" style="font-size:11px;">{{details}}</i>
                </label>

            </Cell>
            <Cell width="12" :xs='xs_prop' :sm='sm_prop' :md='md_prop' :lg='lg_prop' :xl='xl_prop'>
                <template v-if="data && data.length > 30">
                    <textarea :disabled="disabled" :readonly="readonly" >{{data}}</textarea>
                </template>
                <template v-else>
                    <input type="text" :readonly="readonly" :disabled="disabled"   :value="data" />
                </template>

            </Cell>
        </Row>

    </div>
</template>

<script lang="ts">
    import {Component, Vue, namespace, Prop} from 'nuxt-property-decorator'

    @Component({
        components: {}
    })
    export default class FormFieldFlat extends Vue {
        @Prop() xs!:number
        @Prop() sm!:number
        @Prop() md!:number
        @Prop() lg!:number
        @Prop() xl!:number

        @Prop() disabled!:boolean
        @Prop() readonly!:boolean
        @Prop() label!:string
        @Prop() details!:string
        @Prop() data!:any
        @Prop() model!: string

        xs_prop: number = this.xs ? this.xs : 24
        sm_prop: number = this.sm ? this.sm : 24
        md_prop: number = this.md ? this.md : 12
        lg_prop: number = this.xs ? this.xs : 12
        xl_prop: number = this.xs ? this.xs : 12

        disabled_prop:boolean = this.disabled ? this.disabled : false




        mounted(){}
    }
</script>
