import React from "react";
import {Flex, Input, Text} from "@chakra-ui/react";

import {UseFormRegisterReturn} from "react-hook-form";
import {useTranslation} from "next-i18next";

interface Props {
    variant?: 'inline' | 'search' | 'form' | 'default';
    placeholder?: string;
    label?: string;
    name?: string;
    width?: any;
    register?: UseFormRegisterReturn;
    error?: any
}

const DatePickerInput = (({value, onClick, name, width, placeholder, error, label}: any) => {
    const {t} = useTranslation("form");

    return (
        <Flex w={width} align="center">
            <Flex align="flex-start" direction="column" justify="center" flex="1">
                {label && <Text as='label' variant={"form"} color='gray'>{label}</Text>}

                <Input
                    value={value}
                    onClick={onClick}
                    variant={"form"}
                    placeholder={placeholder}
                    name={name}
                    border={error ? "1px solid red" : "1px solid #005492"}
                />

                {error && (
                    <Text color="red">
                        {t(error?.message)}
                    </Text>
                )}

            </Flex>
        </Flex>
    )
})

export default DatePickerInput
