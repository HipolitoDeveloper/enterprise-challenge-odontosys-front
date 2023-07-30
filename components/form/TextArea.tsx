import {
    Box,
    Flex,
    Input as InputC,
    InputGroup,
    InputProps,
    InputRightElement,
    Text,
    Textarea,
    TextareaProps
} from "@chakra-ui/react";
import * as IconFA from "react-icons/fa";
import React from "react";
import {UseFormRegisterReturn} from "react-hook-form";
import {useTranslation} from "next-i18next";

interface Props extends TextareaProps {
    placeholder?: string;
    label?: string;
    name?: string;
    width?: any;
    error?: any
    rightAdornment? : any
    ref?: any;
}

const TextArea: React.FC<Props> = ({
                                    onChange,
                                    placeholder,
                                    label,
                                    name,
                                    width,
                                    error,
                                       value
                                }) => {
    const {t} = useTranslation("form");

    return (
        <Flex w={'100%'} align="center">
            <Flex align="flex-start" direction="column" justify="center" flex="1">
                {label && <Text as='label'  color='gray'>{label}</Text>}

                    <Textarea
                        value={value}
                        onChange={onChange}
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
    );
}

export default TextArea;

const styles = {
    searchIcon: {
        position: "relative",
        top: 35,
        left: 20,
    },
};
