import {Checkbox as CheckboxC, CheckboxProps as ChakraCheckboxProps, Flex} from "@chakra-ui/react";
import React from "react";
import {UseFormRegisterReturn} from "react-hook-form";

interface Props extends ChakraCheckboxProps {
    variant?: string;
    color?: string;
    onChange?: any;
    value?: any;
    children: any;
    register?: UseFormRegisterReturn
}

const Checkbox: React.FC<Props> = ({
                                       variant,
                                       color,
                                       onChange,
                                       value,
                                       children,
                                       name,
                                       register
                                   }) => {
    return (
        <Flex>
            <CheckboxC {...register} defaultChecked onChange={onChange} value={value} name={name} mr='20px' />
            {children}
        </Flex>
    );
}

export default Checkbox
