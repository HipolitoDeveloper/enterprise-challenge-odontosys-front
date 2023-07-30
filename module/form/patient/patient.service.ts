import {apiDelete, apiGet, apiPost, apiPut} from "../../../hooks/api/useApi";
import axios from "axios";
import {Constants} from "../../../common/Constants";
import {IPatient} from "../../../interfaces/IPatient";

const url = Constants.URL_PATIENT

export const getPatients = async () => {
    return apiGet(`${url}`)
}

export const getPatient = async (patientId?: any) => {

    return apiGet(`${url}/${patientId}`)
}

export const postPatient = async (data: IPatient) => {
    return apiPost(url, data)
}

export const putPatient = (data: IPatient) => {
    return apiPut(url, data)
}

export const deletePatient = (patientId?: any) => {
    return apiDelete(`${url}/${patientId}`)
}


