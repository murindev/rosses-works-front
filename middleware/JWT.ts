import { Middleware } from '@nuxt/types'
import {IToken} from "~/types/token";
import {$axios} from "~/utils/api";

const cookieparser = process.server ? require('cookieparser') : undefined

const JWT: Middleware = (context) => {
    try {
        const token = cookieparser.parse(context.req.headers.cookie).JWT;

        if(token !== undefined) {
            let Token:IToken =  decodeToken(token);
            if(new Date().getTime() >= Token.exp * 1000){
                context.redirect('/login?token=expired')
            }

            $axios.setHeader('Authorization', 'Bearer ' + token)

            console.log('in now  ',new Date().getTime());
            console.log('in token',Token.exp * 1000);
        } else {
            // context.redirect('/login')
            console.log('1111');
        }
    } catch (e) {
        // context.redirect('/login')
        console.log('2222');
    }



}



function decodeToken (str:string): IToken {
    str = str.split('.')[1]

    str = str.replace('/-/g', '+')
    str = str.replace('/_/g', '/')
    switch (str.length % 4) {
        case 0:
            break
        case 2:
            str += '=='
            break
        case 3:
            str += '='
            break
        default:
            throw new Error('Invalid token')
    }

    str = (str + '===').slice(0, str.length + (str.length % 4))
    str = str.replace(/-/g, '+').replace(/_/g, '/')

    str = decodeURIComponent(escape(Buffer.from(str, 'base64').toString('binary')))

    return JSON.parse(str)
}





export default JWT
