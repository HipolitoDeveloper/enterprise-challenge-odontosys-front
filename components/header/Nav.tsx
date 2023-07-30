import {Flex, Grid, GridItem, GridProps as ChakraGridProps, HStack, IconButton, Image} from "@chakra-ui/react";
import * as IconFA from "react-icons/fa";
import Input from "../form/Input";
import React, {useRef} from "react";
import {signOut} from 'next-auth/react';
import {destroyCookie} from "nookies";
import {useTabLayout} from "../../hooks/layout/useTabLayout";
import Drawer from "../menus/aside/Drawer";
import AsideMobile from "../menus/aside/AsideMobile";
import aside from "../menus/aside/Aside";

interface MotionProps extends ChakraGridProps {
    transition?: object;
}

interface Props {
}

const Nav: React.FC<Props> = ({}) => {
    const {isMobile} = useTabLayout()
    const asideRef = useRef<any>();

    const onSignOut = () => {
        destroyCookie(null, 'accessToken')
        signOut()
    }

    return (
        <Grid
            w='100%'
            h='100%'
            templateColumns="repeat(5, 1fr)"
            gap={1}
        >
            <GridItem colSpan={3} h='100%'>
                <Flex align="center" justify={isMobile? "space-between" :"center"} h='100%'>

                    {!isMobile ? (
                        <Image
                            mr='30px'
                            w='50px'
                            src="/assets/logo/odontosys.png"
                            alt="Odontosys"
                        />
                    ) : (
                        <>
                        <AsideMobile asideRef={asideRef} />
                        <IconButton variant="blank"
                                    h='100%'
                                    w='30%'
                                    onClick={() => {
                                        asideRef?.current?.onOpen()
                                    }}
                                    aria-label={'menu-hambuguer-icon'}>
                            <IconFA.FaBars size={30} color={"#FDB803"}/>
                        </IconButton>
                        </>

                    )}

                    {!isMobile && (
                        <Input placeholder='Pesquisar...' variant="search" width="100%"
                               style={{borderRadius: '5px', height: 30}}
                               onChange={(value: any) => console.log(value)}/>
                    )}

                </Flex>
            </GridItem>
            <GridItem colSpan={2} w='100%'>
                <HStack spacing="10px" h="100%" style={{float: "right"}}>
                    <IconButton variant="blank" aria-label="configuration-button">
                        <IconFA.FaCog size={20} color={"#005492"}/>
                    </IconButton>
                    <IconButton variant="blank" aria-label="notification-icon">
                        <IconFA.FaBell size={20} color={"#005492"}/>
                    </IconButton>
                    <IconButton variant="blank" aria-label="user-avatar" onClick={() => onSignOut()}>
                        <IconFA.FaUserAlt size={20} color={"#005492"}/>
                    </IconButton>
                </HStack>
            </GridItem>

        </Grid>
    );
}


export default React.memo(Nav)
