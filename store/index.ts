
import Vuex from 'vuex'
const cookieparser = process.server ? require('cookieparser') : undefined
const store = new Vuex.Store({})


export {store,cookieparser}

