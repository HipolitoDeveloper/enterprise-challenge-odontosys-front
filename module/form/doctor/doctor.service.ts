import {apiDelete, apiGet, apiPost, apiPut} from "../../../hooks/api/useApi";
import {Constants} from "../../../common/Constants";
import {IPatient} from "../../../interfaces/IPatient";
import {IDoctor} from "../../../interfaces";

const url = Constants.URL_DOCTOR


export const getDoctors = async () => {
    return await apiGet(`${url}`)
}

export const getDoctor = async (DoctorId?: any) => {
    return await apiGet(`${Constants.URL_DOCTOR}/${DoctorId}`)
}

export const postDoctor = async (data: IDoctor) => {
    return await apiPost(Constants.URL_DOCTOR, data)
}

export const putDoctor = async (data: IDoctor) => {
    return await apiPut(`${Constants.URL_DOCTOR}/${data.id}`, data)
}

export const deleteDoctor = async (DoctorId?: any) => {
    return await apiDelete(`${Constants.URL_DOCTOR}/${DoctorId}`)
}
