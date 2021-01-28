<template>
    <Form>
        <div class="h-panel h-panel-no-border">
            <div class="h-panel-bar">
                <span class="h-panel-title">{{title}}</span>
            </div>
            <div class="h-panel-body">
                <template v-for="column in columns" v-if="!column.hasOwnProperty('edit')">

                    <FormItem v-if="!column.inputType" :label="column.title">
                        <input type="text" v-model="column.value">
                    </FormItem>

                    <FormItem v-else-if="column.inputType === 'switch'" :label="column.title">
                        <h-switch v-model="column.value"/>
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
    export default class CrudForm extends Vue {

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
            await this.$nuxt.$emit('crudFormSubmit',this.returnObject)
        }


        initFields(){
            this.columns.forEach(i => this.returnObject[i.prop as string] = i.value)
        }

        async mounted() {
           await this.init()
        }
    }
</script>
