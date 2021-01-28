<template>

        <div :class="className" :style="{height: height + 'px'}">
            <table>
                <thead>
                <tr>
                    <th v-if="counter" style="width: 30px"><span class="h-tag h-tag-bg-gray">#</span></th>
                    <template v-for="column in columns">
                        <th :style="{width:column.width ? column.width+'px' : ''}">
                            <div class="th-top">
                                <span>{{column.title}}</span>
                                <template v-if="!column.hasOwnProperty('sort')">
                            <span class="h-table-sort-handler" @click="sortTable(column)">
                                <span class="h-table-sort-desc" v-if="sorts.key === column.prop">
                                    <i v-if="sorts.key === column.prop && sorts.direction === 'asc'" class="h-icon-down red-color"></i>
                                    <i v-if="sorts.key === column.prop && sorts.direction === 'desc'" class="h-icon-top red-color"></i>
                                </span>
                                <span v-else>
                                    <i class="h-icon-down"></i>
                                </span>
                            </span>
                                </template>
                            </div>

                            <div v-if="column.hasOwnProperty('filter')" class="filter">
                                <template v-if="['select','selectInSet'].indexOf(column.filter.condition) !== -1">
                                    <Select v-model="column.filter.value" :datas="column.filter.source" keyName="id" titleName="name"  @change="filterTable()"/>
                                </template>
                                <template v-else-if="column.filter.condition === 'like'">
                                    <div class="h-input h-input-suffix-icon">
                                        <input type="text" v-model="column.filter.value" @keyup="filterTable()">
                                        <i class="h-icon-close" @click="column.filter.value = null, filterTable()"></i>
                                    </div>


                                </template>
                                <!--                         <template v-else-if="column.filter.queryInput === 'checkbox'"></template>
                                                         <template v-else-if="column.filter.queryInput === 'sdsdsd'"></template>
                                                         <template v-else>
                                                             <input type="text" v-model="column.filter.value">
                                                         </template>-->
                                <template v-else>
                                    fff
                                </template>
                            </div>
                            <div v-else-if="checkIfFilters">&nbsp;</div>
                        </th>
                    </template>


                    <slot name="th">

                    </slot>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(row,k) in rows">
                    <td v-if="counter" class="center"><span class="h-tag h-tag-bg-gray">{{k+1}}</span></td>
                    <template v-for="column in columns">
                        <td :class="column.hasOwnProperty('class') ? column.class : ''">
                            <template v-if="column.hasOwnProperty('input')">

                                <template v-if="column.input.type === 'switch'">
                                    <h-switch v-model="row[column.prop]" :disabled="column.input.disabled"/>
                                </template>

                                <template v-if="column.input.type === 'checkIcons'">
                                    <i v-if="row[column.prop]" class="h-icon-check green-color"/>
                                    <i v-else class="h-icon-minus gray-color"/>
                                </template>

                                <template v-if="column.input.type === 'telText'">
                                    <span v-text="$tel(row[column.prop])"></span>
                                </template>

                                <template v-if="column.input.type === 'selectMultiply'">
                                    <Select v-if="row[column.prop]"
                                            v-model="row[column.prop]"
                                            :datas="column.input.source" :multiple="true"
                                            :disabled="column.input.hasOwnProperty('disabled') ? column.input.disabled : false"
                                            :keyName="column.input.hasOwnProperty('sourceNameKey') ? column.input.sourceNameKey : 'id'"
                                            :titleName="column.input.hasOwnProperty('sourceValueKey') ? column.input.sourceValueKey : 'name'"
                                            style="width: fit-content"
                                    />
                                </template>

                                <template v-if="column.input.type === 'select'">
                                    <Select v-if="row[column.prop]"
                                            v-model="row[column.prop]"
                                            :datas="column.input.source"
                                            :disabled="column.input.hasOwnProperty('disabled') ? column.input.disabled : false"
                                            :keyName="column.input.hasOwnProperty('sourceNameKey') ? column.input.sourceNameKey : 'id'"
                                            :titleName="column.input.hasOwnProperty('sourceValueKey') ? column.input.sourceValueKey : 'name'"
                                            style="width: fit-content"
                                    />
                                </template>

                                <template v-if="column.input.type === 'hasOne'">
                                    <span v-if="column.input.source" v-text="showContentHasOne(column,row)"></span>
                                </template>


                            </template>
                            <span v-else>{{row[column.prop]}}</span>
                        </td>
                    </template>
                    <slot name="td" v-bind:row="row"></slot>
                </tr>
                </tbody>
            </table>
        </div>

</template>

<script lang="ts">
    import {Component, Vue, namespace, Prop, Watch} from 'nuxt-property-decorator'
    import {ICrudForm, ICrudFormSort} from "~/types/_service";

    //const Example = namespace('Example')

    @Component({
        components: {}
    })
    export default class FTable extends Vue {

        @Prop() rows!: any
        @Prop() className!: string
        @Prop() height!: number
        @Prop() counter!: boolean
        @Prop() columns!: ICrudForm[]
        @Prop() sorts!: ICrudFormSort

       //ENGINE
        sortTable(column: ICrudForm){
            this.$nuxt.$emit('FTableSort',{
                key: column.prop,
                direction: this.sorts.direction === 'asc' ? 'desc' : 'asc'
            })
        }
        filterTable(){
            this.$nuxt.$emit('FTableFilter',this.columns)
        }


        // METHODS
        showContentHasOne(column: ICrudForm, row: object) {
            if (row.hasOwnProperty(column.prop) && row[column.prop as keyof object]) {
                return row[column.prop as keyof object][column.input?.keyName as keyof object]
            } else {
                return ''
            }
        }

        checkIfFilters(){
            return  this.columns.find(c => c.hasOwnProperty('filter'))
        }

        async created(){

        }



    }
</script>
