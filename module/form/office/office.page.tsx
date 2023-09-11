import {useTranslation} from "next-i18next";
import FormLayout from "../../../components/layouts/FormLayout";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import OfficeSchema, {officeForm} from "./office.schema";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {Constants} from "../../../common/Constants";
import {getOffice, postOffice, putOffice} from "./office.service";
import {useGenericMutation} from "../../../hooks/react-query/useGenericMutation";
import {useToast} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useTabLayout} from "../../../hooks/layout/useTabLayout";
import {Pages} from "../../../common/MenuItems";

const defaultValues = {


};

interface Props {
    id: any
}

export const OfficeFormPage: React.FC<Props> = ({id}) => {

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
        resolver: yupResolver(OfficeSchema),
    })

    //CRUD queries and mutations
    const {
        isLoading,
        data: office = {},
        isSuccess,
    } = useQuery([Constants.URL_OFFICE, id], async () => await getOffice(id), {
        enabled: id !== undefined,
    })
    const {
        mutateAsync: onInsert,
    }: any = useGenericMutation(async (data) => await postOffice(data), Constants.URL_OFFICE, (oldData, newData) => [...oldData, newData])
    const {
        mutateAsync: onUpdate,
    }: any = useGenericMutation(async (data) => await putOffice(data), Constants.URL_OFFICE, ((oldData, newData) => {
        return oldData.map((data: any) => {
            if (data.id === newData.id) {
                data = {...newData}
            }

            return data
        })
    }))

    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        setValue(`nm_rua`, office.nm_rua)
        setValue(`nm_bairro`, office.nm_bairro)
        setValue(`nm_local`, office.nm_local)
        setLoaded(true)

    }, [office])


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
                handleCurrentPage(Pages.Offices, null, false)
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
        <FormLayout title={'Consultório'}
                    templateColumns='repeat(4, 300px)'
                    templateRows='repeat(3, 100px)'
                    onSubmit={handleSubmit(onSubmit)}
                    loading={(isLoading) && (!loaded)}
                    register={register}
                    getFieldState={getFieldState}
                    control={control}
                    resetForm={reset}
                    lastPage={Pages.Offices}
                    items={officeForm} submitButtonName={t("SUBMIT")}/>
    );
};




