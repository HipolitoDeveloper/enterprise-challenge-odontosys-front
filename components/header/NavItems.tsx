import {
    Box,
    Flex,
    Input as InputC,
    Popover,
    Text,
    PopoverTrigger,
    useDisclosure,
    PopoverContent,
    PopoverCloseButton,
    PopoverArrow,
    PopoverHeader,
    PopoverBody,
    Button,
} from "@chakra-ui/react";
import React from "react";

interface Props {
    name: string;
    items: any[];
}

const NavItems: React.FC<Props> = ({name, items}) => {
    const {onOpen, onClose, isOpen} = useDisclosure();

    return (
        // <Box style={{borderWidth: 1, borderStyle: "solid", borderColor: 'red'}}>
        <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            closeOnBlur={true}
        >
            <PopoverTrigger>
                <Button variant={"blank"}>{name}</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody bg="white" style={styles.popoverBody}>
                    <Box
                        __css={{
                            ...styles.box,
                        }}
                    >
                        {items.map(({name}) => (
                            <Box
                                key={name}
                                __css={{
                                    ...styles.item,
                                    _hover: {
                                        opacity: 0.3,
                                        transition: "all 0.5s",
                                        cursor: "pointer",
                                    }
                                }}
                            >
                                <Text p="3">{name}</Text>
                            </Box>
                        ))}

                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Popover>
        // </Box>
    );
}

export default NavItems

const styles = {
    popoverBody: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

    },
    box: {
        borderStyle: "solid",
        borderColor: "#bcbcbc",
        borderWidth: 1,
        borderRadius: 5,
    },
    item: {
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
    },
};
