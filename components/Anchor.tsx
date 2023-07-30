import styled from '@emotion/styled';

export const Anchor = styled.a({
        fontFamily: 'Montserrat',
        cursor: "pointer",
        fontSize: "20px",
        "&:hover": {
            color: "#005492"
        },


    },
    props => ({
        color: props.color
    }));
