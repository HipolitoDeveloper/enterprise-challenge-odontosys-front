import {
    Box,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex, IconButton, Image,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";
import {IMenuItem} from "../../../interfaces";
import {MenuItems} from "../../../common/MenuItems";
import {useRouter} from "next/router";
import React, {useState} from "react";
import MenuUniqueItem from "./MenuUniqueItem";
import MenuMultipleItems from "./MenuMultipleItems";
import Button from "../../Button";
import * as IconFA from "react-icons/fa";

interface Props {
    navSize: "small" | "large";
    changeNavSize(size: string): void
}

const Aside: React.FC<Props> = ({navSize = "large", changeNavSize}) => {
    const {t} = useTranslation("common");

    const router = useRouter();
    const {onOpen, isOpen, onClose} = useDisclosure()

    const renderItem = (selected: boolean, item: IMenuItem, index: number) => {
        return {
            "unique": (<MenuUniqueItem key={index} selected={selected} navSize={navSize} {...item}/>),
            "multiple": (<MenuMultipleItems key={index} navSize={navSize} changeNavSize={changeNavSize} {...item} />)
        }[item.type]
    }

    return (
        <Flex
            pos="sticky"
            h="100vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            w={navSize == "small" ? "75px" : "350px"}
            flexDir="column"
            justifyContent="flex-start"
            overflowX='scroll'
            css={{
            '&::-webkit-scrollbar': {
                width: '2px',
                height: '10px'
            },
            '&::-webkit-scrollbar-track': {
                width: '1px',
            },
            '&::-webkit-scrollbar-thumb': {
                background: 'lightGrey',
                borderRadius: '5px',

            },
        }}
        >
            <IconButton mt="35px" variant="blank" size='lg' onClick={() => changeNavSize(navSize === "small" ? "large" : "small")}  aria-label={'menu-hambuguer-icon'}>
                <IconFA.FaBars size={30} color={"#005492"}/>
            </IconButton>




            {/*<Flex direction="column" align="center" mb="50px">*/}
            {/*    <Text color="bg" fontSize="16px">*/}
            {/*        Olá Rodrigo,*/}
            {/*    </Text>*/}
            {/*    <Text color="bg" fontSize="25px" fontWeight="bold">*/}
            {/*        Bem vindo de volta!*/}
            {/*    </Text>*/}
            {/*</Flex>*/}

            <Flex
                mt="100px"
                flexDir="column"
                w="100%"
                h='100%'

            >
                {MenuItems.map((item, index) => (
                    renderItem(router.pathname === item.route, item, index)
                ))}
            </Flex>
        </Flex>

    );
}


export default Aside

// <DrawerFooter borderTopStyle="solid" borderTopWidth="1px" borderTopColor='lightGray' w="100%" h="100%">
//     <VStack w="100%" h="100%" align="flex-start" justify='flex-start' direction='column' ml='20px'
// mt='100px'>
//     <Text color='bg' fontSize='18px'>Configuraçoes</Text>
// <Text color='bg' fontSize='18px'>Tutoriais</Text>
// <Text color='bg' fontSize='18px'>Ajuda</Text>
// </VStack>
// </DrawerFooter>
