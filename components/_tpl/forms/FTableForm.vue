<template>
    <Form>
        <div class="h-panel h-panel-no-border">
            <div class="h-panel-bar">
                <span class="h-panel-title">{{title}}</span>
            </div>
            <div class="h-panel-body">
                <template v-for="column in columns" v-if="!column.hasOwnProperty('edit')">

                    <FormItem v-if="!column.input" :label="column.title" :required="column.hasOwnProperty('required') ? column.required : false">
                        <input type="text" v-model="column.value">
                    </FormItem>

                    <FormItem v-else-if="column.input.type === 'switch' || column.input.type ===  'checkIcons'" :label="column.title" :required="column.hasOwnProperty('required') ? column.required : false">
                        <h-switch v-model="column.value"/>
                    </FormItem>

                    <FormItem v-else-if="column.input.type === 'hasOne'" :label="column.title" :required="column.hasOwnProperty('required') ? column.required : false">
                        <Select v-model="column.value" :datas="column.input.source"
                                :keyName="column.input.hasOwnProperty('keyName') ? column.input.keyName : 'id'"
                                :titleName="column.input.hasOwnProperty('titleName') ? column.input.titleName : 'name'"
                                :null-option="false"/>
                    </FormItem>

                    <FormItem v-else-if="column.input.type === 'select'" :label="column.title" :required="column.hasOwnProperty('required') ? column.required : false">
                        <Select v-model="column.value" :datas="column.input.source"
                                :keyName="column.input.hasOwnProperty('keyName') ? column.input.keyName : 'id'"
                                :titleName="column.input.hasOwnProperty('titleName') ? column.input.titleName : 'name'"
                                :null-option="false"/>
                    </FormItem>

                    <FormItem v-else-if="column.input.type === 'phone'" :label="column.title" :required="column.hasOwnProperty('required') ? column.required : false">
                        <input type="tel" v-model="column.value" @keyup="column.value = $tel(column.value)" @click="column.value = $tel(column.value)">
                    </FormItem>

                    <FormItem v-else-if="column.input.type === 'selectMultiply'" :label="column.title" :required="column.hasOwnProperty('required') ? column.required : false">
                        <Select v-model="column.value"
                                :multiple="true"
                                :datas="column.input.source"
                                :keyName="column.input.hasOwnProperty('keyName') ? column.input.keyName : 'id'"
                                :titleName="column.input.hasOwnProperty('titleName') ? column.input.titleName : 'name'"
                                :null-option="false"/>
                    </FormItem>

                </template>

            </div>

            <div class="h-panel-footer right">
                <Button color="primary" @click="make()">{{buttonText}}</Button>
            </div>
        </div>
    </Form>
</template>

<script lang="ts">
    import {Component, Vue, namespace, Prop} from 'nuxt-property-decorator'
    import {ICrudForm, IEmptyObject} from "~/types/_service";

    @Component({
        components: {}
    })
    export default class FTableForm extends Vue {

        @Prop() columns!: ICrudForm[]
        @Prop() action!: string

        public title: string = ''
        public buttonText: string = ''
        public returnObject: IEmptyObject = {}
        public clonedColumns: ICrudForm[] = []


        async init(){
            switch (this.action) {
                case 'edit':
                    this.title = 'Редактировать значения'
                    this.buttonText = 'Изменить'
                    break
                case 'add':
                    this.title = 'Добавить значения'
                    this.buttonText = 'Добавить'
                    break
                case 'delete':
                    break
            }
        }
        async make(){
            await this.initFields()

            let checkRequired = await this.columns.find(i => i.hasOwnProperty('required') && i.required === true && !i.value)
            console.log('checkRequired',checkRequired, this.columns);
            if(checkRequired){
                this.$Message({
                    text:`Поле <b>${checkRequired.title}</b> является обязательным`,
                    type:'warn'
                })
            } else {
                await this.$nuxt.$emit('tableFormSubmit',this.returnObject)
            }
        }


        initFields(){
            this.columns.forEach(i => this.returnObject[i.prop as string] = i.value)
        }

        async mounted() {
            console.log(this.columns);
           await this.init()
        }
    }
</script>
