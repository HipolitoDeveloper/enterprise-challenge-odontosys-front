import {Box, Flex,
    FormControl, FormErrorMessage, Input as InputC, Select as SelectC,SelectProps as ChakraSelectProps, Text} from "@chakra-ui/react";
import * as IconFA from "react-icons/fa";
import React from "react";
import {UseFormRegister, UseFormRegisterReturn} from "react-hook-form";
import {useTranslation} from "next-i18next";
import {queryClient} from "../../services/QueryClient";
import {Constants} from "../../common/Constants";
import {useGenericQuery} from "../../hooks/react-query/useGenericQuery";
import {getOffices} from "../../module/form/office/office.service";
import {getDoctors} from "../../module/form/doctor/doctor.service";
import {getPatients} from "../../module/form/patient/patient.service";
import {getProcedures} from "../../module/form/procedures/procedure.service";


interface Props extends ChakraSelectProps {
    variant?: 'form' | 'pagination' | 'filter';
    placeholder?: string;
    label?: string;
    name?: string;
    options: any;
    width?: any;
    register?: UseFormRegisterReturn,
    error?: any
    height?: number | string;

}

const Select: React.FC<Props> = ({
                                     variant,
                                     placeholder,
                                     label,
                                     name,
                                     onChange,
                                     value,
                                     width,
                                     options,
                                     register,
                                     error,
                                     height,
                                     defaultValue
                                 }) => {

    let officesSelect: any = queryClient.getQueryData(Constants.URL_OFFICE)
    const {
    } = useGenericQuery(Constants.URL_OFFICE, async () => await getOffices(), {
        enabled: officesSelect === undefined && name === 'office'
    })
    let doctorsSelect: any = queryClient.getQueryData(Constants.URL_DOCTOR)
    const {
    } = useGenericQuery(Constants.URL_DOCTOR, async () => await getDoctors(), {
        enabled: doctorsSelect === undefined && name === 'doctor_id'
    })

    let patientsSelect: any = queryClient.getQueryData(Constants.URL_PATIENT)
    const {
    } = useGenericQuery(Constants.URL_PATIENT, async () => await getPatients(), {
        enabled: patientsSelect === undefined && name === 'patient_id'
    })

    let proceduresSelect: any = queryClient.getQueryData(Constants.URL_PROCEDURE)
    const {
    } = useGenericQuery(Constants.URL_PROCEDURE, async () => await getProcedures(), {
        enabled: proceduresSelect === undefined && name === 'procedure_id'
    })

    if(name === 'office' ) {
        options = officesSelect?.map((row: any) => {
            return ({
                name: row.nr_local,
                value: JSON.stringify(row)
            })
        }) ?? options
    }

    if(name === 'doctor_id' ) {
        options = doctorsSelect?.map((row: any) => {
            return ({
                name: row.nome,
                value: JSON.stringify(row)
            })
        }) ?? options
    }

    if(name === 'patient_id' ) {
        options = patientsSelect?.map((row: any) => {
            return ({
                name: row.nm_paciente,
                value: JSON.stringify(row)
            })
        }) ?? options
    }

    if(name === 'procedure_id' ) {
        options = proceduresSelect?.map((row: any) => {
            return ({
                name: row.nm_procedimento,
                value: JSON.stringify(row)
            })
        }) ?? options
    }

    const {t} = useTranslation("form");
    return (
        <Flex align="center" direction="column" justify="flex-end"  w={width ?? '100%'} h='100%' >
            <FormControl isInvalid={!!error} >
                {label && <Text as='label' variant={variant} color='bg'>{label}</Text>}

                <SelectC name={name}
                         height={height}
                         placeholder={placeholder}
                         variant={variant}
                         borderBottom={!!error ? '1px solid red' : "1px solid #005492"}
                         {...register}
                >
                    {options?.map(({value, name}: any, index: any) => (
                        <option key={index} value={value}>{name}</option>
                    ))}
                </SelectC>
                <FormErrorMessage  position='absolute'>{error && t(error?.message)}</FormErrorMessage>

            </FormControl>
        </Flex>
    );
}

export default Select;

const styles = {
    searchIcon: {
        position: "relative",
        top: 35,
        left: 20,
    },
};
