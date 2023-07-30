import {
    Drawer as DrawerC,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    DrawerProps,
    Flex,
    IconButton,
    Image, Link,
    useDisclosure,
    UseDisclosureProps,
} from '@chakra-ui/react';
import React, {forwardRef, ForwardRefRenderFunction, PropsWithChildren, ReactNode, useImperativeHandle,} from 'react';
import * as IconFA from "react-icons/fa";

interface Props extends Omit<DrawerProps, 'onClose' | 'isOpen'>, UseDisclosureProps {
    onClose?: () => void;
    variant: 'drawer' | 'sidebar';
    placement: 'right' | 'left';
    children: ReactNode;
}

export interface SideBarRefProps {
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
}

const Drawer: ForwardRefRenderFunction<PropsWithChildren<UseDisclosureProps>, Props> = (
    {placement, children, onClose: eventClose, ...props}: Props,
    ref
) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    useImperativeHandle(
        ref,
        () => ({
            children,
            isOpen,
            onOpen,
            onClose,
        }),
        [children, isOpen, onClose, onOpen]
    );
    return (
        <DrawerC
            closeOnOverlayClick={true}
            placement={placement}
            isOpen={isOpen}
            onClose={eventClose ? eventClose : onClose}
            {...props}
        >
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerHeader  h='100px'>
                            <Link href='/dashboard'>
                                <Image
                                    ml={18}
                                    htmlWidth="130px"
                                    src="/assets/logo/odontosys.png"
                                    alt="Odontosys LOGO"
                                />
                            </Link>
                            <IconButton position='absolute'
                                        w='10%'
                                        right={4}
                                        top={8}
                                        aria-label={'mobile-menu'}
                                        onClick={eventClose ? eventClose : onClose}
                            >
                                <IconFA.FaAlignJustify size={20}/>
                            </IconButton>
                    </DrawerHeader>
                    <DrawerBody w="100%">{children}</DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </DrawerC>
    );
};

export default forwardRef(Drawer);
