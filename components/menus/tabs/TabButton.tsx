import {Box, Button as ButtonC, ButtonProps, HStack, IconButton} from "@chakra-ui/react";
import React from "react";
import * as IconFA from "react-icons/fa";
import {useTabs} from "../../../hooks/layout/useTabs";

interface Props extends ButtonProps {
    onClick?: any;
    active: boolean
    index: number;
}

const TabButton: React.FC<Props> = ({
                                        children,
                                        onClick,
                                        active,
                                        index
                                    }) => {
    const {deleteTab} = useTabs()

    return (
        <ButtonC
            __css={{
                w: '12%',
                h: '30px',
                backgroundColor: active ? 'bg' : 'bgLight',
                _hover: {
                    backgroundColor: 'bg',
                    color: 'white',
                    transition: '0.4s all'
                },
                boxShadow:"0 4px 12px -1px rgba(0, 0, 0, 0.2)"
            }}
            variant={'blank'}
            type={"button"}
        >
            <HStack color='white' justify='space-between' >
                <Box onClick={onClick} w='90%'
                >
                    {children}

                </Box>
                <IconButton
                            w='10%'
                            m={0}
                    aria-label={'close-tab-button'}
                    variant={'blank'}
                    onClick={() => {
                        deleteTab(index)
                    }}
                    __css={
                        {
                            backgroundColor: 'inherit',

                        }}
                    type={"button"}
                >
                    <IconFA.FaTimes size={15} color='white'/>
                </IconButton>
            </HStack>
        </ButtonC>
    );
}

export default TabButton;


