export const ButtonOverride = {
    baseStyle: {
        borderRadius: 5,
        paddingLeft: 30,
        paddingRight: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        _focus: {
            boxShadow: "none"
        }
    },
    variants: {
        filled: {
            backgroundColor: "bg",
            border: "none",
            color: "white",
            _hover: {
                opacity: 0.6,
                transition: "all 0.5s",
                cursor: "pointer",
            },
        },
        outlined: {
            backgroundColor: "white",
            borderStyle: "solid",
            borderColor: "bg",
            borderWidth: 2,
            color: "bg",
            fontWeight: "bold",

            _hover: {
                backgroundColor: "bg",
                color: "white",
                transition: "all 0.5s",
                cursor: "pointer",
            },
        },
        rounded: {
            color: "white",
            fontWeight: "bold",
            border: "none",
            backgroundColor: "bg",
            borderRadius: 20,

            _hover: {
                opacity: 0.8,
                transition: "all 0.5s",
                cursor: "pointer",
            },
        },
        blank: {
            color: "inherit",
            margin: 0,
            outline: "none",
            pr: 0,
            pl: 0,
            _hover: {
                opacity: 0.8,
                transition: "all 0.5s",
                cursor: "pointer",
            }
        },
        blank_light: {
            color: "inherit",
            margin: 0,
            outline: "none",
            bg: 'bgLight',
            pr: 0,
            pl: 0,
            _hover: {
                opacity: 0.8,
                transition: "all 0.5s",
                cursor: "pointer",
            }
        },
        menu_button: {
            color: "inherit",
            marginLeft: '-7px',
            h: "60px",
            size: "none",
            _hover: {
                opacity: 0.8,
                transition: "all 0.5s",
                cursor: "pointer",
            },
        },
        danger: {
            backgroundColor: "redPastel",
            border: "none",
            color: "white",
            _hover: {
                opacity: 0.6,
                transition: "all 0.5s",
                cursor: "pointer",
            },
        }
    },
    sizes: {
        square: {
            w: '150px',
            h: '80%'
        },
        lg: {
            w: '100%',
            h: '40px'
        },
        md: {
            w: '50%',
            h: '40px'
        },
        sm: {
            w: '20%',
            h: '40px'
        },
        xs: {
            w: '10px',
            h: '40px'
        },
        none: {}
    },
    defaultProps: {
        variant: "filled",
        size: "lg"
    },
};
