import React, {useEffect} from "react";
import {Checkbox, CheckboxProps} from "@chakra-ui/react";

interface Props extends CheckboxProps {
    variant?: string;
    color?: string;
    onChange?: any;
    value?: any;
    children?: any;
}

// @ts-ignore
// eslint-disable-next-line react/display-name
const TableCheckbox = React.forwardRef<Ind, Props>(
    ({_indeterminate, checked, ...rest}, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef


        return (
            <Checkbox ref={resolvedRef} isChecked={checked} {...rest} size='lg'   />

        )
    }
)

export default TableCheckbox
