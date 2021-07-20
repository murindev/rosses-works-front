export interface IEmptyObject {
    [key: string]: any
}

export interface ICrudForm {
    title: string
    class?: string
    required?: boolean
    prop: string
    value: any
    sort?: boolean
    edit?: boolean
    inputType?: string // checkIcons, telText, selectMultiply, content
    inputDisabled?: boolean
    width?: number

    input?: {
        type: string
        disabled?: boolean
        source?: any
        keyName?: string
        titleName?: string
    }
    filter?: {
        value: any
        condition?:string
        queryInput?: string
        source?: any
    }

    head?: {
        input?: string
        disabled?: boolean
        sort?: boolean
    }
}

export interface ICrudFormSort {
    key: string,
    direction: string
}

export interface ICrudFormFilter {
    key: string
    condition?: string
    value?: any
}

export interface IMainRequest {
    sort: object
    filter: object
    data: object
}
