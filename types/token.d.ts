export interface IToken {
    iss: string,
    iat: number,
    exp: number,
    nbf: number,
    jti: string,
    sub: number,
    prv: string
}
