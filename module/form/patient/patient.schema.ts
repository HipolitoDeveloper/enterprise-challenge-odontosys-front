import * as yup from "yup";
import {IFormProperty} from "../../../interfaces/IFormProperty";
import i18n from "i18next";
import { IColumn } from "../../../components/table/@types/Table.types";

export const patientForm: IFormProperty[] = [
    {
        name: 'code',
        label: "COD_LABEL",
        order: 0,
        colSpan: 1,
        fieldType: "input",
        type: 'text',
        placeholder: "COD_PLACEHOLDER",
        width: '30%',
        readOnly: true,

    },
    {
        name: 'name',
        label: "NAME_LABEL",
        order: 2,
        colSpan: 5,
        fieldType: "input",
        type: 'text',
        placeholder: "NAME_PLACEHOLDER",
        width: '90%',
    },
    {
        name: 'parentId',
        label: "PARENTID_LABEL",
        order: 4,
        colSpan: 5,
        fieldType: "select",
        placeholder: "PARENTID_PLACEHOLDER",
        options: [{name: "default", value: 1}],
        width: '70%',

    },
    {
        name: 'externalCode',
        label: "EXTERNALCODE_LABEL",
        order: 3,
        colSpan: 1,
        fieldType: "input",
        type: 'text',
        placeholder: "EXTERNALCODE_PLACEHOLDER",
        width: '50%',

    },
    {
        name: 'text.description',
        label: "DESC_LABEL",
        order: 0,
        colSpan: 6,
        fieldType: "input",
        type: 'text',
        placeholder: 'DESC_PLACEHOLDER',
        width: '95%',
    },

    {
        name: 'text.longDescription',
        label: "DESCLONG_LABEL",
        order: 5,
        colSpan: 6,
        fieldType: "input",
        type: 'text',
        placeholder: "DESCLONG_PLACEHOLDER",
        width: '100%',
    },

    {
        name: 'text.metaTitle',
        label: "METATITLE_LABEL",
        order: 5,
        colSpan: 4,
        fieldType: "input",
        type: 'text',
        placeholder: "METATITLE_PLACEHOLDER",
        width: '90%',
    },
    {
        name: 'text.metaKeyword',
        label: "METAKEYWORD_LABEL",
        order: 0,
        colSpan: 4,
        fieldType: "input",
        type: 'text',
        placeholder: 'METAKEYWORD_PLACEHOLDER',
        width: '90%',
    },
    {
        name: 'text.metaDescription',
        label: "METADESCRIPTION_LABEL",
        order: 0,
        colSpan: 4,
        fieldType: "input",
        type: 'text',
        placeholder: 'METADESCRIPTION_PLACEHOLDER',
        width: '90%',
    },
]

export const patientColumns: IColumn[] = [
    {
        accessor: 'code',
        Header: "COD_LABEL",
        width: '60%',
    },
    {
        accessor: 'externalCode',
        Header: "EXTERNALCODE_LABEL",
        width: '70%',
    },
    {
        accessor: 'name',
        Header: "NAME_LABEL",
        width: '60%',
    },
    {
        accessor: 'parent.name',
        Header: "PARENTID_LABEL",
        width: '60%',
    },

]


const patientSchema = yup.object().shape({
    code: yup.string().required("COD_ERROR"),
    name: yup.string().required('NAME_ERROR'),
    externalCode: yup.string().required('CODEXT_ERROR'),
    parentId: yup.mixed().optional(),
    text: yup.object().shape({
        longDescription: yup.string().required("LONGDESCRIPTION_ERROR"),
        description: yup.string().required("DESC_ERROR"),
        metaTitle: yup.string().required('METATITLE_ERROR'),
        metaKeyword: yup.string().required('METAKEYWORD_ERROR'),
        metaDescription: yup.string().required('METADESCRIPTION_ERROR'),
    })

})

export default patientSchema
