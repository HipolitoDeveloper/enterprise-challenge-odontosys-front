import * as yup from "yup";
import {IFormProperty} from "../../../interfaces/IFormProperty";
import {IColumn} from "../../../components/table/@types/Table.types";

export const officeForm: IFormProperty[] = [
    {
        name: 'nm_rua',
        label: "NM_RUA_LABEL",
        order: 2, // You might want to adjust order as needed
        colSpan: 2, // Adjust colSpan as needed
        fieldType: "input",
        type: 'text',
        placeholder: "NM_RUA_PLACEHOLDER",
        width: '30%',
    },
    {
        name: 'nm_bairro',
        label: "NM_BAIRRO_LABEL",
        order: 3, // Adjust order as needed
        colSpan: 3, // Adjust colSpan as needed
        fieldType: "input",
        type: 'text',
        placeholder: "NM_BAIRRO_PLACEHOLDER",
        width: '70%',
    },
    {
        name: 'nr_local',
        label: "NR_LOCAL_ID_LABEL",
        order: 4, // Adjust order as needed
        colSpan: 4, // Adjust colSpan as needed
        fieldType: "input",
        type: 'text',
        placeholder: "NR_LOCAL_PLACEHOLDER",
        width: '50%',
    },
]

export const officeColumns: IColumn[] = [
    {
        accessor: 'nm_rua',
        Header: "NM_RUA_LABEL",
        width: '60%',
    },
    {
        accessor: 'nm_bairro',
        Header: "NM_BAIRRO_LABEL",
        width: '70%',
    },
    {
        accessor: 'nr_local',
        Header: "NR_LOCAL_ID_LABEL",
        width: '50%',
    },
]

const officeSchema = yup.object().shape({
    nm_rua: yup.string().required('NM_RUA_ERROR'),
    nm_bairro: yup.string().required('NM_BAIRRO_ERROR'),
    nr_local: yup.string().required('NR_LOCAL_ERROR'),
})

export default officeSchema;
