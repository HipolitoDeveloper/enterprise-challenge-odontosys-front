import {useTranslation} from "next-i18next";
import FormLayout from "../../../components/layouts/FormLayout";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import patientSchema, {patientForm} from "./patient.schema";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {Constants} from "../../../common/Constants";
import {getPatient, postPatient, putPatient} from "./patient.service";
import {useGenericMutation} from "../../../hooks/react-query/useGenericMutation";
import {useToast} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useTabLayout} from "../../../hooks/layout/useTabLayout";
import {Pages} from "../../../common/MenuItems";

const defaultValues = {
    id: "",
    code: "",
    name: "",
    externalCode: "",
    parentId: 0,
    text: {
        longDescription: "",
        description: "",
        metaTitle: "",
        metaKeyword: "",
        metaDescription: ""
    },
    active: true

};

interface Props {
    id: any
}

export const PatientPage: React.FC<Props> = ({id}) => {

    //Call HOOKS
    const {t} = useTranslation("form");
    const {t: tCommon} = useTranslation("common");
    const {modal, handleModal, handleCurrentPage, handleLoading} = useTabLayout()
    const toast = useToast()
    const router = useRouter()
    const operation = id === undefined ? 'ADD' : 'EDIT'

    const {
        handleSubmit,
        register,
        control,
        getValues,
        setValue,
        reset,
        getFieldState,
        formState: {errors}
    } = useForm({
        // defaultValues,
        resolver: yupResolver(patientSchema),
    })

    //CRUD queries and mutations
    const {
        isLoading,
        data: patient = {},
        isSuccess,
    } = useQuery([Constants.URL_PATIENT, id], async () => await getPatient(id), {
        enabled: id !== undefined,
    })
    const {
        mutateAsync: onInsert,
    }: any = useGenericMutation(async (data) => await postPatient(data), Constants.URL_PATIENT, (oldData, newData) => [...oldData, newData])
    const {
        mutateAsync: onUpdate,
    }: any = useGenericMutation(async (data) => await putPatient(data), Constants.URL_PATIENT, ((oldData, newData) => {
        return oldData.map((data: any) => {
            if (data.id === newData.id) {
                data = {...newData}
            }

            return data
        })
    }))

    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        setValue(`id`, patient.id)
        setValue(`code`, patient.code)
        setValue(`name`, patient.name)
        setValue(`externalCode`, patient.externalCode)
        setValue(`parentId`, patient.parentId)
        setValue(`text.longDescription`, patient?.text?.longDescription)
        setValue(`text.description`, patient?.text?.description)
        setValue(`text.metaTitle`, patient?.text?.metaTitle)
        setValue(`text.metaKeyword`, patient?.text?.metaKeyword)
        setValue(`text.metaDescription`, patient?.text?.metaDescription)
        setValue(`active`, true)
        setLoaded(true)

    }, [patient])


    const onSubmit = async (data: any) => {
        const operations = {
            "ADD": async () => {
                data.active = true
                await onInsert(data)
                reset()
                toast({
                    title: tCommon("SUCCESS"),
                    description: tCommon("SUCCESS_INSERT_DESCRIPTION"),
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            },
            "EDIT": async () => {
                handleCurrentPage(Pages.Patients, null, false)
                await onUpdate(data)
                toast({
                    title: tCommon("SUCCESS"),
                    description: tCommon("SUCCESS_EDIT_DESCRIPTION"),
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            },
        }

        try {
            // @ts-ignore
            handleLoading(true)
            await operations[operation || "ADD"]()
            handleLoading(false)
        } catch (error) {
            handleLoading(false)
            handleModal({
                ...modal,
                visible: true,
                variant: "error",
                errors: error,
            });
        }
    }

    return (
        <FormLayout title={'Categorias'}
                    templateColumns='repeat(4, 300px)'
                    templateRows='repeat(3, 100px)'
                    onSubmit={handleSubmit(onSubmit)}
                    loading={(isLoading) && (!loaded)}
                    register={register}
                    getFieldState={getFieldState}
                    control={control}
                    resetForm={reset}
                    lastPage={Pages.Patients}
                    items={patientForm} submitButtonName={t("SUBMIT")}/>
    );
};




