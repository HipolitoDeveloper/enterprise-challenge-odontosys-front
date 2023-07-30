import * as yup from "yup";
import i18n from "i18next";

export interface IPatient {
    id: any,
    code: string,
    name: string,
    active: boolean,
    externalCode: string,
    parentId: number,
    text: {
        longDescription: string,
        description: string,
    }

}
