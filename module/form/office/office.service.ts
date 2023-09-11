import {apiDelete, apiGet, apiPost, apiPut} from "../../../hooks/api/useApi";
import {Constants} from "../../../common/Constants";

const url = Constants.URL_OFFICE

export const getOffices = async () => {
    return apiGet(`${url}`)
}

export const getOffice = async (officeId?: any) => {

    return apiGet(`${url}/${officeId}`)
}

export const postOffice = async (data: any) => {
    return apiPost(url, data)
}

export const putOffice = (data: any) => {
    return apiPut(url, data)
}

export const deleteOffice = (officeId?: any) => {
    return apiDelete(`${url}/${officeId}`)
}


