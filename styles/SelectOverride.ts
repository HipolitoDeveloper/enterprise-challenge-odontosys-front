import {InputOverride} from "./InputOverride";

export const SelectOverride = {
    baseStyle: {
        field: {
            ...InputOverride.baseStyle.field,
            bg: "white",
            appearance: "none",
            paddingBottom: "1px",
            lineHeight: "normal",
            "> option, > optgroup": {
                bg: "white",
            },
            outline: "none",
            cursor: "pointer",
            _hover: {
                bg: "transparent",
                opacity: 0.7,

            }
        },
        icon: {
            width: "1.5rem",
            height: "100%",
            insetEnd: "0.5rem",
            position: "relative",
            color: "currentColor",
            fontSize: "1.25rem",
            _disabled: {
                opacity: 0.5,
            },
        }
    },
    variants: {
        pagination: {
            field: {
                color: "bg",
                h: "17px",
                bg: "lightBlue",
                appearance: "none",
                lineHeight: "normal",
                "> option, > optgroup": {
                    bg: "lightBlue",

                },
                outline: "none",
                cursor: "pointer",
                _hover: {
                    bg: "lightBlue",
                    opacity: 0.7,

                }
            },
            icon: {
                width: "1rem",
                height: "100%",
                insetEnd: "0.5rem",
                position: "relative",
                color: "currentColor",
                fontSize: "1.25rem",
                _disabled: {
                    opacity: 0.5,
                },
            }
        },
        form: {
            field: {
                color: "bg",
                backgroundColor: "lightGray",
                border: "1px solid #005492",
                // boxShadow: "1px 0px 15px -2px rgba(0,0,0,0.21)",
                borderRadius: 5,
                height: 50,
                appearance: "none",
                lineHeight: "normal",
                "> option, > optgroup": {
                    bg: "white",

                },
                outline: "none",
                cursor: "pointer",
                _hover: {
                    bg: "white",
                    opacity: 0.7,

                }
            },
            icon: {
                width: "1rem",
                height: "100%",
                insetEnd: "0.5rem",
                position: "relative",
                color: "currentColor",
                fontSize: "1.25rem",
                _disabled: {
                    opacity: 0.5,
                },
            }
        },
        filter: {
            field: {
                color: "bg",
                border: "1px solid #005492",
                backgroundColor: "white",
                borderRadius: 5,
                appearance: "none",
                lineHeight: "normal",
                "> option, > optgroup": {
                    bg: "white",

                },
                outline: "none",
                cursor: "pointer",
                _hover: {
                    bg: "white",
                    opacity: 0.7,

                }
            },
            icon: {
                width: "1rem",
                height: "100%",
                insetEnd: "0.5rem",
                position: "relative",
                color: "currentColor",
                fontSize: "1.25rem",
                _disabled: {
                    opacity: 0.5,
                },
            }
        }
    },
    defaultProps: {
        variant: "default",
    },
};
