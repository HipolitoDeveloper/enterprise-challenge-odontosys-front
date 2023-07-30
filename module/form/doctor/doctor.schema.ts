import * as yup from "yup";
import {IFormProperty} from "../../../interfaces/IFormProperty";
import {IColumn} from "../../../components/table/@types/Table.types";

export const doctorForm: IFormProperty[] = [
    {
        name: 'matricula',
        label: "MATRICULA_LABEL",
        order: 1,
        colSpan: 3,
        fieldType: "input",
        type: 'text',
        width: '30%',
        placeholder: "MATRICULA_PLACEHOLDER",

    },
    {
        name: 'nome',
        label: "NOME_LABEL",
        order: 5,
        colSpan: 6,
        fieldType: "input",
        type: 'text',
        placeholder: "NOME_PLACEHOLDER",
    },
    {
        name: 'crm',
        label: "CRM_LABEL",
        order: 3,
        colSpan: 3,
        fieldType: "input",
        type: 'text',
        width: '70%',
        placeholder: "CRM_PLACEHOLDER",
    },
]


const doctorSchema = yup.object().shape({
    matricula: yup.number().required('MATRICULA_ERROR'),
    nome: yup.string().required('NOME_ERROR'),
    crm: yup.number().required('CRM_ERROR'),

})

export default doctorSchema

export const doctorColumns: IColumn[] = [
    {
        accessor: 'matricula',
        Header: "MATRICULA_LABEL",
        width: '60%',
    },
    {
        accessor: 'nome',
        Header: "NOME_LABEL",
        width: '60%',
    },
    {
        accessor: 'crm',
        Header: "CRM_LABEL",
        width: '60%',
    },
]
