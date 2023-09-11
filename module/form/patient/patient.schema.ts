import * as yup from "yup";
import {IFormProperty} from "../../../interfaces/IFormProperty";
import {IColumn} from "../../../components/table/@types/Table.types";

export const patientForm: IFormProperty[] = [
    {
        name: 'nm_paciente',
        label: "NM_PACIENTE_LABEL",
        order: 2,
        colSpan: 2,
        fieldType: "input",
        type: 'number',
        placeholder: "NM_PACIENTE_PLACEHOLDER",
        width: '30%',
    },
    {
        name: 'ds_sexo',
        label: "DS_SEXO_LABEL",
        order: 4,
        colSpan: 3,
        fieldType: "select",
        placeholder: "DS_SEXO_PLACEHOLDER",
        options: [{name: "Masculino", value: 'M'}, {name: "Feminino", value: 'F'}],
        width: '70%',

    },
    {
        name: 'dt_nascimento',
        label: "DT_NASCIMENTO_LABEL",
        order: 3,
        colSpan: 3,
        fieldType: "date",
        type: 'text',
        placeholder: "DT_NASCIMENTO_PLACEHOLDER",
        width: '50%',
    },
    {
        name: 'ds_peso',
        label: "DS_PESO_LABEL",
        order: 3,
        colSpan: 2,
        fieldType: "input",
        type: 'number',
        placeholder: "DS_PESO_PLACEHOLDER",
        width: '50%',
    },
    {
        name: 'ds_altura',
        label: "DS_ALTURA_LABEL",
        order: 3,
        colSpan: 2,
        fieldType: "input",
        type: 'number',
        placeholder: "DS_ALTURA_PLACEHOLDER",
        width: '50%',
    },
    {
        name: 'office',
        label: "CLINICA_ID_LABEL",
        order: 4,
        colSpan: 5,
        fieldType: "select",
        placeholder: "CLINICA_ID_PLACEHOLDER",
        width: '70%',

    },

]

export const patientColumns: IColumn[] = [
    {
        accessor: 'nm_paciente',
        Header: "NM_PACIENTE_LABEL",
        width: '60%',
    },
    {
        accessor: 'ds_sexo',
        Header: "DS_SEXO_LABEL",
        width: '70%',

    },
    {
        accessor: 'dt_nascimento',
        Header: "DT_NASCIMENTO_LABEL",
        width: '50%',
        formatter: 'DD/MM/yyyy'
    },
    {
        accessor: 'ds_peso',
        Header: "DS_PESO_LABEL",
        width: '50%',
    },
    {
        accessor: 'ds_altura',
        Header: "DS_ALTURA_LABEL",
        width: '50%',
    },
    {
        accessor: 'office.nr_local',
        Header: "CLINICA_ID_LABEL",
        width: '70%',

    },

]


const patientSchema = yup.object().shape({
    nm_paciente: yup.number().required('NM_PACIENTE_ERROR'),
    ds_sexo: yup.string().required('DS_SEXO_ERROR'),
    dt_nascimento: yup.string().required('DT_NASCIMENTO_ERROR'),
    ds_peso: yup.number().required('DS_PESO_ERROR'),
    ds_altura: yup.number().required('DS_ALTURA_ERROR'),
    office: yup.mixed().required('CLINICA_ID_ERROR')


})

export default patientSchema
