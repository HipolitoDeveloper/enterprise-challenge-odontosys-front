import {Box, Flex, Text, VStack} from "@chakra-ui/react";
import React, {useState} from "react";
import {useTranslation} from "next-i18next";
import Aside from "../menus/aside/Aside";
import Header from "../header/Header";
import {useRouter} from "next/router";
import TabHeader from "../menus/tabs/TabHeader";
import {useTabLayout} from "../../hooks/layout/useTabLayout";
import {useLayout} from "../../hooks/layout/useLayout";

interface Props {
    title: string,
    hasBackButton?: boolean

}

const MainLayout: React.FC<Props> = ({
                                         title,
                                         children,
                                         hasBackButton

                                     }) => {

    const [navSize, setNavSize] = useState("large")

    const {t} = useTranslation("form");
    const router = useRouter()

    const changeNavSize = (size: string) => {
        setNavSize(size)
    }

    return (
        <Flex w='100%' h='100%' overflowY='hidden'>
            <Flex direction='column' w='100%'
            >
                    <Header/>
                <TabHeader />
                <Box overflowX='scroll'
                     css={{
                         '&::-webkit-scrollbar': {
                             width: '5px',
                             height: '10px'
                         },
                         '&::-webkit-scrollbar-track': {
                             width: '1px',
                         },
                         '&::-webkit-scrollbar-thumb': {
                             background: '#005492',
                             borderRadius: '5px',

                         },
                     }}>
                    <VStack w='100%' align='flex-start' spacing='-5px'>
                        <Box>
                            <Text color='bg' fontSize='36px' fontWeight='bold'>
                                {title}
                            </Text>
                        </Box>
                    </VStack>
                    <Flex direction="column" justify='space-between'>
                        {children}
                    </Flex>
                </Box>
            </Flex>


        </Flex>
    )
        ;
}

export default MainLayout
