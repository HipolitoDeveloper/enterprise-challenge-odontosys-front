export const InputOverride = {
  baseStyle: {
    field: {

      textDecoration: "none",
      width: "100%",
      paddingRight: 65,
      paddingLeft: 15,
    },
  },
  variants: {
    inline: {
      field: {
        border: "1px solid #005492",

        margin: "5px 0",
        _focus: {
          outline: "none",
        },
        height: '30px',

      },
    },
    search: {
      field: {
        bg: "lightGray",
        border: "1px solid #005492",
        paddingLeft: 55,
        _focus: {
          outline: "none",
        },
        fontSize: '14px',
        _placeholder: {
          fontSize: '14px',
        },
        height: '20px',

      },
    },
    form: {
      field: {
        border: "1px solid #005492",
        backgroundColor: "lightGray",
        // boxShadow: "1px 0px 15px -2px rgba(0,0,0,0.21)",
        borderRadius: 5,
        height: 50,
        _placeholder: {
          color: "bg",
        },
        _focus: {
          // outlineColor: "bg",
          outlineWidth: 1

        },

      },
    },
    default: {
      field: {
        border: "none",
        boxShadow: "1px 0px 15px 4px rgba(0,0,0,0.21)",
        height: 50,

        _focus: {
          outline: "none",
        },
      },
    },
  },
  defaultProps: {
    variant: "default",
  },
};
