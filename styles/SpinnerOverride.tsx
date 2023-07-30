import { cssVar, SystemStyleObject } from "@chakra-ui/theme-tools"

const $size = cssVar("spinner-size")

export const SpinnerOverride = {
    baseStyle: {
        width: [$size.reference],
        height: [$size.reference],
    },

   sizes: {
       xs: {
           [$size.variable]: "0.75rem",
       },
       sm: {
           [$size.variable]: "1rem",
       },
       md: {
           [$size.variable]: "1.5rem",
       },
       lg: {
           [$size.variable]: "2rem",
       },
       xl: {
           [$size.variable]: "3rem",
       },
   },
    defaultProps: {
        size: "md",
    },
};
