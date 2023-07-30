import {useTranslation} from "next-i18next";
import FormLayout from "../../../components/layouts/FormLayout";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import doctorSchema, {doctorForm} from "./doctor.schema";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {Constants} from "../../../common/Constants";
import {useGenericMutation} from "../../../hooks/react-query/useGenericMutation";
import {useToast} from "@chakra-ui/react";
import {getDoctor, postDoctor, putDoctor} from "./doctor.service";
import React, {useEffect, useState} from "react";
import {useTabLayout} from "../../../hooks/layout/useTabLayout";
import {Pages} from "../../../common/MenuItems";
import {advertisementType} from "../../../common/Enums";


const defaultValues = {

    externalCode: "",
    code: "",
    advertisementType: "",
    ncm: "",
    name: "",
    skuCode: "",
    providerId: 0,
    categoryId: 0,
    producerId: 0,
    id: "",
    active: true
};

interface Props {
    id: any
}


export const DoctorPage: React.FC<Props> = ({id}) => {
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
            getValues,
            setValue,
            reset,
            control,
            getFieldState,
            formState: {errors}
        } = useForm({
            // defaultValues,
            resolver: yupResolver(doctorSchema),
        });

        console.log("id", id)
        //CRUD queries and mutations
        const {
            data: doctor = {},
            isLoading

        } = useQuery([Constants.URL_DOCTOR, id], async () => await getDoctor(id), {
            enabled: id !== undefined,
        })


        const {
            mutateAsync: onInsert,
        }: any = useGenericMutation(async (data) => await postDoctor(data), Constants.URL_DOCTOR, (oldData, newData) => [...oldData, newData])
        const {
            mutateAsync: onUpdate,
        }: any = useGenericMutation(async (data) => await putDoctor(data), Constants.URL_DOCTOR, ((oldData, newData) => {
            return oldData.map((data: any) => {
                if (data.id === newData.id) {
                    data = {...newData}
                }

                return data
            })
        }))

        const [loaded, setLoaded] = useState(false)

        useEffect(() => {
                setValue(`matricula`, doctor.matricula)
                setValue(`nome`, doctor.nome)
                setValue(`crm`, doctor.crm)
                setLoaded(true)

            }, [doctor]
        )

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
                    await onUpdate({ ...data, id: id})
                    handleCurrentPage(Pages.DoctorForm, null, false)
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
            <FormLayout title={'Cadastro de Médico'}
                        templateColumns='repeat(6, 200px)'
                        templateRows='repeat(3, 100px)'
                        onSubmit={handleSubmit(onSubmit)}
                        register={register}
                        items={doctorForm}
                        resetForm={reset}
                        submitButtonName={t("SUBMIT")}
                        loading={(isLoading) && (!loaded)}
                        control={control}
                        lastPage={Pages.Doctors}
                        getFieldState={getFieldState}/>

        );

    }
;




