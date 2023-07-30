export const TableOverride = {
    baseStyle: {
        table: {
            width: "100%",

        },
        thead: {
            h: "60px",
            w: "100%",
        },
        th: {
            textTransform: "uppercase",
            letterSpacing: "wider",
            textAlign: "start",
            bg: "lightBlue",
            fontFamily: "heading",
            fontSize: "10px",

        },
        tr: {
            bgColor: "white",
            textAlign: "start",
            fontSize: "10px",
            "&:hover": {
                bgColor: 'bgLight',
                transition: '1s'
            }

        },
        tbody: {
            tr: {
                bgColor: "white",
                "&:hover": {
                    bgColor: 'gray'
                }
            }

        },
        caption: {
            mt: 4,
            textAlign: "center",
            fontWeight: "medium",
        },
    },
    variants: {
        simple: {
            th: {
                color: "bg",
                borderBottom: "0px",
                fontSize: "10px",

                // ...numericStyles,
            },
            td: {
                borderBottom: "0px",
                borderColor: "black",
                // ...numericStyles,
            },
            caption: {
                color: "black",
            },
            tfoot: {

                bg: "gray",
                tr: {
                    "&:last-of-type": {
                        th: {borderBottomWidth: 0,   w:"100%", },
                    },
                },
            },
        },
        striped: {
            th: {
                color: "bg",
                borderBottom: "0px",
                fontSize: "10px",

                // ...numericStyles,
            },
            td: {
                borderBottom: "0px",
                borderColor: "black",
                // ...numericStyles,
            },
            caption: {
                color: "black",
            },
            tbody: {
                tr: {
                    margin: 0,
                    padding: 0,
                    fontSize: "100%",
                    verticalAlign: 'baseline',
                    "&:nth-of-type(even)": {
                        "th, td": {
                            borderColor: "lightGray",

                        },
                        td: {
                            backgroundColor: "lightBlue"

                        },
                    },
                },
            },
            tfoot: {
                tr: {
                    "&:last-of-type": {
                        th: {borderBottomWidth: 0},
                    },
                },
            },
        },
        unstyled: {}
    }
}
