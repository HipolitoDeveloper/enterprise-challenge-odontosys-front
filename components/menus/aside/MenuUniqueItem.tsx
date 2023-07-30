import {Box, Flex, HStack, Text,} from "@chakra-ui/react";
import * as IconFA from "react-icons/fa";
import {useRouter} from "next/router";
import Button from "../../Button";
import React from "react";
import {IMenuItem} from "../../../interfaces";
import {renderIcon} from "../../../common/Icon";
import {useTabLayout} from "../../../hooks/layout/useTabLayout";

interface Props extends IMenuItem {
    selected: boolean;
    navSize: string;
}

const MenuUniqueItem: React.FC<Props> = ({selected, name, route, icon,navSize}) => {
    const router = useRouter();
    const {handleCurrentPage} = useTabLayout()

    return (
        <Button variant='menu_button'  onClick={() => route ? handleCurrentPage(route) : () => {
        }}>
            <Flex h="70px" direction="column" flex={1}  >
                {selected && (
                    <Box
                        bg="bg"
                        h="70px"
                        w="5px"
                        borderTopRightRadius="10px"
                        borderBottomRightRadius="10px"
                        position="absolute"
                        left='6px'
                    />
                )}
                <Flex flex={1} direction="row" align="center" justify="flex-start" ml='20px' w={navSize === "small"? "40px" : "250px"}
                      color={selected ? 'bg' : 'gray'} >
                    {renderIcon(icon)}

                    {navSize === "large" && (
                        <Text pl="20px" color="inherit" fontSize="14px" fontWeight="bold" letterSpacing='5px'
                              textTransform="uppercase">
                            {name}
                        </Text>
                    )}

                </Flex>
            </Flex>
        </Button>
    )
        ;
}

export default React.memo(MenuUniqueItem)


