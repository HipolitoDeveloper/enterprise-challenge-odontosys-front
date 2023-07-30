import {mode} from "@chakra-ui/theme-tools"

export const DrawerOverride = {
    baseStyle: {
        overlay: {
            backgroundColor: "rgba(10,23,55,0.5)",
        },
        dialogContainer: {
            display: "flex",
            zIndex: "modal",
            justifyContent: "center",
        },
        dialog: {
            maxW: "20vw",
            h: "100vh",
            width: 10,
            height: "100vh",
            zIndex: "modal",
            maxH: "100vh",
            bg: "white",
            color: "inherit",
            boxShadow: "1px 0px 15px 4px rgba(0,0,0,0.21)"

        },
        header: {
            flex: 1,
            px: 6,
            py: 4,
            fontSize: "20px",
            fontWeight: "semibold",
        },
        closeButton: {
            position: "absolute",
            top: 2,
            insetEnd: 3,
        },
        body: {
            paddingInlineStart: 1,
            paddingInlineEnd: 0,

            px: 6,
            py: 2,
            flex: 3,
            overflow: "auto",

        },
        footer: {
            flex: 1,
            px: 6,
            py: 4,
        },
    },

    defaultProps: {},
};

function rgba(arg0: number, arg1: number, arg2: number, arg3: number) {
    throw new Error("Function not implemented.");
}

