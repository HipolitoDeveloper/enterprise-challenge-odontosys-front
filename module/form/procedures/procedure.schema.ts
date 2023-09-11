import * as yup from "yup";
import {IFormProperty} from "../../../interfaces/IFormProperty";
import {IColumn} from "../../../components/table/@types/Table.types";

export const procedureForm: IFormProperty[] = [
    {
        name: 'nm_procedimento',
        label: "NM_PROCEDIMENTO_LABEL",
        order: 1,
        colSpan: 2,
        fieldType: "input",
        type: 'text',
        placeholder: "NM_PROCEDIMENTO_PLACEHOLDER",
        width: '30%',
    },
]

export const procedureColumns: IColumn[] = [
    {
        accessor: 'nm_procedimento',
        Header: "NM_PROCEDIMENTO_LABEL",
        width: '60%',
    },
]

const procedureSchema = yup.object().shape({
    nm_procedimento: yup.string().required('NM_PROCEDIMENTO_ERROR'),
})

export default procedureSchema;
