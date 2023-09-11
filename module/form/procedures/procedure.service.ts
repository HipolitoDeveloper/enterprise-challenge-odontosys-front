import {apiDelete, apiGet, apiPost, apiPut} from "../../../hooks/api/useApi";
import axios from "axios";
import {Constants} from "../../../common/Constants";

const url = Constants.URL_PROCEDURE

export const getProcedures = async () => {
    return apiGet(`${url}`)
}

export const getProcedure = async (procedureId?: any) => {

    return apiGet(`${url}/${procedureId}`)
}

export const postProcedure = async (data: any) => {
    return apiPost(url, data)
}

export const putProcedure = (data: any) => {
    return apiPut(url, data)
}

export const deleteProcedure = (procedureId?: any) => {
    return apiDelete(`${url}/${procedureId}`)
}


