
import Vuex from 'vuex'
const cookieparser = process.server ? require('cookieparser') : undefined
const store = new Vuex.Store({})
// import { $axios } from "~/utils/api";


export {store,cookieparser}

