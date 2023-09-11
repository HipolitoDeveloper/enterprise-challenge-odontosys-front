import {useTranslation} from "next-i18next";
import FormLayout from "../../../components/layouts/FormLayout";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import ConsultSchema, {consultForm} from "./consult.schema";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {Constants} from "../../../common/Constants";
import {getConsult, postConsult, putConsult} from "./consult.service";
import {useGenericMutation} from "../../../hooks/react-query/useGenericMutation";
import {useToast} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useTabLayout} from "../../../hooks/layout/useTabLayout";
import {Pages} from "../../../common/MenuItems";
import {queryClient} from "../../../services/QueryClient";
import {useGenericQuery} from "../../../hooks/react-query/useGenericQuery";
import {getDoctor, getDoctors} from "../doctor/doctor.service";
import {IFormProperty} from "../../../interfaces/IFormProperty";
import {getPatients} from "../patient/patient.service";
import {getProcedures} from "../procedures/procedure.service";

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

export const ConsultFormPage: React.FC<Props> = ({id}) => {

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
        resolver: yupResolver(ConsultSchema),
    })

    //CRUD queries and mutations
    const {
        isLoading,
        data: consult = {},
        isSuccess,
    } = useQuery([Constants.URL_CONSULT, id], async () => await getConsult(id), {
        enabled: id !== undefined,
    })
    const {
        mutateAsync: onInsert,
    }: any = useGenericMutation(async (data) => await postConsult(data), Constants.URL_CONSULT, (oldData, newData) => [...oldData, newData])
    const {
        mutateAsync: onUpdate,
    }: any = useGenericMutation(async (data) => await putConsult(data), Constants.URL_CONSULT, ((oldData, newData) => {
        return oldData.map((data: any) => {
            if (data.id === newData.id) {
                data = {...newData}
            }

            return data
        })
    }))

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (Object.keys(consult).length > 0 && operation === 'EDIT') {
            setValue(`id`, consult.id);
            setValue(`doctor_id`, consult.doctor_id);
            setValue(`patient_id`, consult.patient_id);
            setValue(`procedure_id`, consult.patient_id);
            setValue(`dt_hr_consulta`, new Date(consult.dt_hr_consulta))
            setValue(`nr_consultorio`, consult.nr_consultorio);
            setLoaded(true)

        }
    }, [consult])


    const onSubmit = async (data: any) => {
        const operations = {
            "ADD": async () => {
                data.active = true
                await onInsert({
                    ...data,
                    doctor: JSON.parse(data.doctor_id),
                    procedure: JSON.parse(data.procedure_id),
                    patient: JSON.parse(data.patient_id)

                })
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
                handleCurrentPage(Pages.Consults, null, false)
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
        <FormLayout title={'Consulta'}
                    templateColumns='repeat(4, 300px)'
                    templateRows='repeat(3, 100px)'
                    onSubmit={handleSubmit(onSubmit)}
                    loading={(isLoading) && (!loaded)}
                    register={register}
                    getFieldState={getFieldState}
                    control={control}
                    resetForm={reset}
                    lastPage={Pages.Consults}
                    items={consultForm} submitButtonName={t("SUBMIT")}/>
    );
};




