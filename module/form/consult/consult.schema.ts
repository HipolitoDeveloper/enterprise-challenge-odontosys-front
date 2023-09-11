import * as yup from "yup";
import {IFormProperty} from "../../../interfaces/IFormProperty";
import {IColumn} from "../../../components/table/@types/Table.types";

export const consultForm: IFormProperty[] = [
    {
        name: 'doctor_id',
        label: "DOCTOR_ID_LABEL",
        order: 2,
        colSpan: 3,
        fieldType: "select",
        type: 'text',
        placeholder: "DOCTOR_ID_PLACEHOLDER",
        width: '70%',
    },
    {
        name: 'patient_id',
        label: "PATIENT_ID_LABEL",
        order: 3,
        colSpan: 3,
        fieldType: "select",
        type: 'text',
        placeholder: "PATIENT_ID_PLACEHOLDER",
        width: '70%',
    },
    {
        name: 'procedure_id',
        label: "PROCEDURE_ID_LABEL",
        order: 3,
        colSpan: 3,
        fieldType: "select",
        type: 'text',
        placeholder: "PROCEDURE_ID_PLACEHOLDER",
        width: '70%',
    },
    {
        name: 'dt_hr_consulta',
        label: "DT_HR_CONSULTA_LABEL",
        order: 4,
        colSpan: 4,
        fieldType: "date",
        type: 'text',
        placeholder: "DT_HR_CONSULTA_PLACEHOLDER",
        width: '50%',
    },
    {
        name: 'nr_consultorio',
        label: "NR_CONSULTORIO_LABEL",
        order: 5,
        colSpan: 4,
        fieldType: "input",
        type: 'number',
        placeholder: "NR_CONSULTORIO_PLACEHOLDER",
        width: '50%',
    },
]

export const consultColumns: IColumn[] = [
    {
        accessor: 'doctor.nome',
        Header: "DOCTOR_ID_LABEL",
        width: '70%',
    },
    {
        accessor: 'patient.nm_paciente',
        Header: "PATIENT_ID_LABEL",
        width: '70%',
    },
    {
        accessor: 'procedure.nm_procedimento',
        Header: "PROCEDURE_ID_LABEL",
        width: '70%',
    },
    {
        accessor: 'dt_hr_consulta',
        Header: "DT_HR_CONSULTA_LABEL",
        width: '50%',
        formatter: 'DD/MM/YYYY'
    },
    {
        accessor: 'nr_consultorio',
        Header: "NR_CONSULTORIO_LABEL",
        width: '50%',
    },
]

const consultSchema = yup.object().shape({
    doctor_id: yup.mixed().optional(),
    patient_id: yup.mixed().optional(),
    procedure_id: yup.mixed().optional(),
    dt_hr_consulta: yup.string().required('DT_HR_CONSULTA_ERROR'),
    nr_consultorio: yup.mixed().required('NR_CONSULTORIO_ERROR'),
})

export default consultSchema;
