import {destroyCookie} from "nookies";
import {signOut} from "next-auth/react";

export const HandlerError  = (error?: any, status?: number) => {
    if(status === 401) {
        destroyCookie(null, 'accessToken')
        signOut()
    }

    if(!error?.length) {
        return ["Não foi possível realizar essa operação"]
    }

    return error ?? ["Não foi possível realizar essa operação"]
}
