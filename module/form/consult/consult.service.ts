import {apiDelete, apiGet, apiPost, apiPut} from "../../../hooks/api/useApi";
import axios from "axios";
import {Constants} from "../../../common/Constants";

const url = Constants.URL_CONSULT

export const getConsults = async () => {
    return apiGet(`${url}`)
}

export const getConsult = async (consultId?: any) => {

    return apiGet(`${url}/${consultId}`)
}

export const postConsult = async (data: any) => {
    return apiPost(url, data)
}

export const putConsult = (data: any) => {
    return apiPut(url, data)
}

export const deleteConsult = (consultId?: any) => {
    return apiDelete(`${url}/${consultId}`)
}


