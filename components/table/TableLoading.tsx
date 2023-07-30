import {Center, Spinner} from '@chakra-ui/react';
import React from "react";

export interface Props {
    loading: boolean;
    hideContent?: boolean;
}

const TableLoading: React.FC<Props> = ({loading, hideContent = false, children}) => {

    return (

        loading ? (
            <Center
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '60%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <Spinner size="lg"/>
            </Center>
        ) : <></>
    );
};

export default TableLoading;
