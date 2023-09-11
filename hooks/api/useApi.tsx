import axios from "axios";
import {parseCookies} from "nookies";
import {Constants} from "../../common/Constants";
import {HandlerError} from "../../common/ErrorHandler";

export const AxiosClient = axios.create({
    baseURL: Constants.API_URL,
});

const cookies = parseCookies();

const headers = {
    headers: {
        "Content-Type": "application/json",

    },
};
export const apiPost = async (url: string, data?: any) => {
    // const config = {
    //     headers: {
    //         "Authorization": `Bearer ${cookies.accessToken}`
    //     }
    // }

    try {
        return await AxiosClient.post(url, data,headers)

    } catch (error: any) {
        throw HandlerError(error.response.data.retorno.erros ?? error.response.data.retorno)
    }

};

export const apiGet = async (url: string) => {
    // const config = {
    //     headers: {
    //         "Authorization": `Bearer ${cookies.accessToken}`
    //     }
    // }

    try {
        const response = await AxiosClient.get(url);
        return response.data
    } catch (error: any) {
        const parsedError = error.toJSON()
        throw HandlerError(null, parsedError.status)
    }
};

export const apiPut = async (url: string, data?: any) => {
    // const config = {
    //     headers: {
    //         "Authorization": `Bearer ${cookies.accessToken}`
    //     }
    // }
    try {
        return await AxiosClient.put(url, data, headers)

    } catch (error: any) {
        throw HandlerError(error.response.data.retorno.erros ?? [JSON.stringify(error.response.data.retorno)])
    }
}

export const apiDelete = async (url: string, data?: any) => {

    try {
        return await AxiosClient.delete(url)

    } catch (error: any) {
        throw HandlerError(error.response?.data?.retorno?.erros ? error.response.data.retorno : [error.response?.data?.mensagens])
    }
};
