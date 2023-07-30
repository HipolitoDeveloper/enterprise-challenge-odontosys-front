import {Button as ButtonC, ButtonProps} from "@chakra-ui/react";
import React from "react";

interface Props extends ButtonProps {
    children?: any;
    onClick?: any;
    submit?: boolean;
}

const Button: React.FC<Props> = ({
                                     style,
                                     variant,
                                     children,
                                     size,
                                     onClick,
                                     submit,
                                     m,
                                     h,
                                     w
                                 }) => {
    return (
        <ButtonC

            style={style}
            m={m}
            h={h}
            w={w}
            onClick={onClick}
            variant={variant}
            size={size}
            type={submit ? "submit" : "button"}
        >
            {children}
        </ButtonC>
    );
}

export default Button;


