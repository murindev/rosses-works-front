import Vue from 'vue';
// @ts-ignore
import HeyUI from "heyui";


import en from '~/assets/locales/heyUI-ru-RU';

Vue.use(HeyUI, {locale: en});

declare module 'vue/types/vue' {
    interface Vue {
        $Message(params: {
            text: string
            type?: string
            timeout?: number
        }): any

        $Notice(params: {
            content: string
            title?: string
            type?: string
            timeout?: string
            icon?: string
        }): any

        $Modal(params: {
            hasCloseIcon?: boolean
            hasMask?: boolean
            hasDivider?: boolean
            closeOnMask?: boolean
            middle?: boolean
            fullScreen?: boolean
            transparent?: boolean
            className?: string
            type?: string
            buttons?: []
            content: string
            width?: number
            events?: object
        }): any

        $Loading(): void


        $Confirm(content: string, title?: string): any

    }
}
