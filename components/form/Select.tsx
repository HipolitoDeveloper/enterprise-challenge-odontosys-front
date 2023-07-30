import {Box, Flex,
    FormControl, FormErrorMessage, Input as InputC, Select as SelectC,SelectProps as ChakraSelectProps, Text} from "@chakra-ui/react";
import * as IconFA from "react-icons/fa";
import React from "react";
import {UseFormRegister, UseFormRegisterReturn} from "react-hook-form";
import {useTranslation} from "next-i18next";


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
