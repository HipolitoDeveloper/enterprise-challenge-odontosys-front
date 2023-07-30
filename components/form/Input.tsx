import {
    Box,
    Flex,
    FormControl,
    FormErrorMessage,
    Input as InputC,
    InputGroup,
    InputProps,
    InputRightElement,
    Text
} from "@chakra-ui/react";
import React from "react";
import {UseFormRegisterReturn} from "react-hook-form";
import {useTranslation} from "next-i18next";

interface Props extends InputProps {
    variant?: 'inline' | 'search' | 'form' | 'default';
    placeholder?: string;
    label?: string;
    name?: string;
    width?: any;
    register?: UseFormRegisterReturn;
    error?: any
    rightAdornment?: any
    forwardedRef?: any;
    readOnly?: boolean
}

const Input: React.FC<Props> = ({
                                    onChange,
                                    variant,
                                    placeholder,
                                    label,
                                    name,
                                    width,
                                    height,
                                    style,
                                    register,
                                    error,
                                    rightAdornment,
                                    forwardedRef,
                                    type,
                                    defaultValue,
                                    readOnly
                                }) => {
    const {t} = useTranslation("form");


    return (
        <Flex align="flex-start" direction="column" justify="flex-end" w={'100%'} h='100%'>
            {label && <Text as='label' variant={variant} color='bg'>{label}</Text>}
            <FormControl isInvalid={!!error}>
                <InputGroup>
                    <InputC
                        style={style}
                        height={height}
                        ref={forwardedRef}
                        variant={variant}
                        onChange={onChange}
                        placeholder={placeholder}
                        name={name}
                        type={type}
                        borderBottom={error ? "1px solid red" : "1px solid #005492"}
                        defaultValue={defaultValue}
                        readOnly={readOnly}
                        {...register}
                    />

                    {rightAdornment && (
                        <InputRightElement>
                            {rightAdornment}
                        </InputRightElement>
                    )}


                </InputGroup>

                <FormErrorMessage
                    position='absolute'
                >{error && t(error?.message)}</FormErrorMessage>
            </FormControl>
        </Flex>
    );
}

export default Input;

const styles = {
    searchIcon: {
        position: "relative",
        top: 35,
        left: 20,
    },
};
