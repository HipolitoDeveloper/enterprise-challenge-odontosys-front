import { mode } from "@chakra-ui/theme-tools";

export const CheckboxOverride = {
  baseStyle: {
    control: {

      w: 30,
      h: 30,
      transitionProperty: "box-shadow",
      transitionDuration: "normal",
      borderStyle: "solid",
      borderWidth: "2px",
      borderRadius: "3px",
      borderColor: "bg",
      color: "white",

      _checked: {
        backgroundColor: "bg",
        borderColor: "bg",
        color: "white",

        _hover: {
          opacity: 0.7,
          borderColor: "bg",
        },

        _disabled: {
          borderColor: "darkGray",
          backgroundColor: "darkGray",
          color: "darkGray",
        },
      },

      _indeterminate: {
        backgroundColor: "darkGray",
        borderColor: "darkGray",
        color: "darkGray",
      },

      _disabled: {
        backgroundColor: "darkGray",
        borderColor: "darkGray",
      },

      _focus: {
        boxShadow: "outline",
      },

      _invalid: {
        borderColor: "red",
      },
    },
    label: {
      userSelect: "none",
      _disabled: { opacity: 0.4 },
    },

    icon: {
      transitionProperty: "transform",
      transitionDuration: "normal",
      fontSize: "10px",
    }
  },

};
