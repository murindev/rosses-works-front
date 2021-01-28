import { Plugin } from '@nuxt/types'
import {$axios, initializeAxios} from '~/utils/api'
// @ts-ignore
import Cookies from 'js-cookie'

const cookieparser = process.server ? require('cookieparser') : undefined


const accessor: Plugin = ({ $axios }) => {

    $axios.onRequest(config => {
        config.headers.common['Authorization'] = 'Bearer ' + Cookies.get('JWT')
    })

    initializeAxios($axios)
}
export default accessor
