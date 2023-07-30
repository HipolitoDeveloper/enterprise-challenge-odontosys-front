import {Center, Flex, Spinner} from '@chakra-ui/react';
import React from "react";

export interface LoadingProps {
    loading: boolean;
    hideContent?: boolean;
}

const Loading: React.FC<LoadingProps> = ({loading, hideContent = false, children}) => {

    return (
        <>
            {!hideContent && loading && (
                <Flex
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    height="100%"
                    background="#FFF"
                    opacity={0.75}
                    zIndex={9999}
                ></Flex>
            )}
            {loading && (
                <Flex
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    height="100%"
                    opacity={0.75}
                    alignItems="center"
                    justifyContent="center"
                    zIndex={9999}
                >
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="#005492"
                        size="xl"
                    />
                </Flex>
            )}
        </>
    );
};

export default Loading;
