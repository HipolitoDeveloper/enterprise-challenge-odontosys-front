import {useTranslation} from "next-i18next";
import FormLayout from "../../../components/layouts/FormLayout";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import procedureSchema, {procedureForm} from "./procedure.schema";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {Constants} from "../../../common/Constants";
import {getProcedure, postProcedure, putProcedure} from "./procedure.service";
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

export const ProcedureFormPage: React.FC<Props> = ({id}) => {

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
        resolver: yupResolver(procedureSchema),
    })

    //CRUD queries and mutations
    const {
        isLoading,
        data: procedure = {},
        isSuccess,
    } = useQuery([Constants.URL_PROCEDURE, id], async () => await getProcedure(id), {
        enabled: id !== undefined,
    })
    const {
        mutateAsync: onInsert,
    }: any = useGenericMutation(async (data) => await postProcedure(data), Constants.URL_PROCEDURE, (oldData, newData) => [...oldData, newData])
    const {
        mutateAsync: onUpdate,
    }: any = useGenericMutation(async (data) => await putProcedure(data), Constants.URL_PROCEDURE, ((oldData, newData) => {
        return oldData.map((data: any) => {
            if (data.id === newData.id) {
                data = {...newData}
            }

            return data
        })
    }))

    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        setValue(`nm_procedimento`, procedure.nm_procedimento)
        setLoaded(true)

    }, [procedure])


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
                handleCurrentPage(Pages.Procedures, null, false)
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
        <FormLayout title={'Procedimento'}
                    templateColumns='repeat(4, 300px)'
                    templateRows='repeat(3, 100px)'
                    onSubmit={handleSubmit(onSubmit)}
                    loading={(isLoading) && (!loaded)}
                    register={register}
                    getFieldState={getFieldState}
                    control={control}
                    resetForm={reset}
                    lastPage={Pages.Procedures}
                    items={procedureForm} submitButtonName={t("SUBMIT")}/>
    );
};




