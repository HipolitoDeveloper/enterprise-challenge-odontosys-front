import {Flex, IconButton, useDisclosure,} from "@chakra-ui/react";
import {useTranslation} from "next-i18next";
import {IMenuItem} from "../../../interfaces";
import {MenuItems} from "../../../common/MenuItems";
import {useRouter} from "next/router";
import React from "react";
import MenuUniqueItem from "./MenuUniqueItem";
import MenuMultipleItems from "./MenuMultipleItems";
import * as IconFA from "react-icons/fa";
import Drawer from "./Drawer";

interface Props {
    asideRef: any;
}

const AsideMobile: React.FC<Props> = ({asideRef}) => {
    const {t} = useTranslation("common");

    const router = useRouter();
    const {onOpen, isOpen, onClose} = useDisclosure()

    const renderItem = (selected: boolean, item: IMenuItem, index: number) => {
        return {
            "unique": (<MenuUniqueItem key={index} selected={selected} navSize={'large'} {...item}/>),
            "multiple": (<MenuMultipleItems key={index} navSize={'large'} changeNavSize={() => asideRef?.current?.onOpen()} {...item} />)
        }[item.type]
    }

    return (
        <Drawer ref={asideRef} variant={"drawer"} placement={"left"}>
                <Flex
                    flexDir="column"
                    justify='flex-start'
                    w="100%"
                    h='100%'
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
                    {MenuItems.map((item, index) => (
                        renderItem(router.pathname === item.route, item, index)
                    ))}
                </Flex>
        </Drawer>
    );
}


export default AsideMobile
