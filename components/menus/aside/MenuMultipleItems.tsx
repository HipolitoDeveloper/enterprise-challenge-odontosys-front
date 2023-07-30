import {Box, Flex, StackProps as ChakraVStackProps, Text, VStack,} from "@chakra-ui/react";
import {useRouter} from "next/router";
import Button from "../../Button";
import React, {useEffect, useState} from "react";
import {IMenuItem} from "../../../interfaces";
import {motion} from "framer-motion";
import {Anchor} from "../../Anchor";
import {renderIcon} from "../../../common/Icon";
import {useTabLayout} from "../../../hooks/layout/useTabLayout";

interface Props extends IMenuItem {
    items: IMenuItem[];
    navSize: "small" | "large";
    changeNavSize: (size: string) => void;
}

interface MotionProps extends ChakraVStackProps {
    transition?: object;
}


const MenuMultipleItems: React.FC<Props> = ({name, route, items, icon, navSize, changeNavSize}) => {
    const router = useRouter();
    const {handleCurrentPage} = useTabLayout()
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    useEffect(() => {
        if (items.some(({route}) => router.pathname === route)) {
            setIsCollapsed(true)
        }
    }, [items])

    const MotionVStack = motion<MotionProps>(VStack)


    return (
        <Flex direction='column' align='flex-start'>
            <Button variant='menu_button' onClick={() => {
                changeNavSize("large")
                setIsCollapsed(!isCollapsed)
            }
            }>

                <Flex h="70px" direction="column" flex={1}>

                    {isCollapsed && (
                        <Box
                            bg="bg"
                            h="70px"
                            w="5px"
                            borderTopRightRadius="10px"
                            borderBottomRightRadius="10px"
                            position="absolute"
                            left='5px'
                        />
                    )}
                    <Flex flex={1} direction="row" align="center" justify="flex-start" ml='20px'
                          w={navSize === "small" ? "40px" : "250px"}
                          color={isCollapsed ? 'bg' : 'gray'}>
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

            {!isCollapsed || navSize === "large" && (
                <MotionVStack align="flex-start"
                              transition={{duration: 1}}
                >
                    {items.map(({name, route}) => (
                        <Button variant='blank' onClick={() => handleCurrentPage(route)} key={route} style={{height: '20px', width: '80%', justifyContent: 'flex-start'}}>
                            <Anchor color={router.pathname === route ? 'black' : 'gray'}>
                                <Flex ml='70px' mb='5px' direction="row" align="flex-start" justify="center"
                                      fontSize="12px"
                                      color="inherit">
                                    {name}
                                </Flex>
                            </Anchor>

                        </Button>
                    ))}
                </MotionVStack>
            )}


        </Flex>
    )
        ;
}

export default MenuMultipleItems


