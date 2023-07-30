import {useRouter} from "next/router";
import React, {createContext, useContext, useState} from "react";
import {HStack, useMediaQuery} from "@chakra-ui/react";
import Aside from "../../components/menus/aside/Aside";
import Modal, {TModal} from "../../components/modal";
import Loading from "../../components/layouts/Loading";
import {Pages} from "../../common/MenuItems";

// import Modal, { TModal } from "../../components/modal";

interface Props {
    config?: any;
    treePath?: any;
    children: any;
}

interface ILayoutContext {
    handleModal(modal: TModal): void;
    handleLoading(loading: boolean): void;

    isMobile: boolean;
    modal: TModal
}

const LayoutContext = createContext({} as ILayoutContext);

const LayoutProvider = ({children}: Props) => {
    const router = useRouter();
    const [isMobile] = useMediaQuery("(max-width: 600px)")
    // const showNav = ShowNavPages.some(({route}: IMenuItem) => route === router.pathname);

    const [modal, setModal] = useState<TModal>({
        visible: false,
        title: "Atenção",
        text: "",
        onOk: () => {
        },
        okTitle: "",
        onClose: () => {
        },
        cancelTitle: "",
        variant: "alert",

    });

    const [loading, setLoading] = useState<boolean>(false)

    const handleModal = (modal: TModal) => {
        setModal(
            {
                ...modal
            }
        )
    }

    const clearModal = () => {
        setModal({
            visible: false,
            title: "Atenção",
            text: "",
            onOk: () => {
            },
            okTitle: "",
            onClose: () => {
            },
            cancelTitle: "",
            variant: "alert"
        })
    }

    const handleLoading = (loading: boolean) => {
        setLoading(loading)
    }

    const contextValues = {
        handleModal,
        clearModal,
        handleLoading,
        modal,
        isMobile
    };

    return (
        <LayoutContext.Provider value={contextValues}>
            <Modal
                {...modal}
                onOk={() => {
                    modal.onOk();
                    setModal({...modal, visible: false})
                }}
                onClose={() => {
                    modal.onClose();
                    setModal({...modal, visible: false})
                }}
            />
            <Loading loading={loading}/>

            <HStack w='100%' h='100%'
                    float='right'>

                {children}
            </HStack>
        </LayoutContext.Provider>
    );
};

const useLayout = () => {
    const context = useContext(LayoutContext);
    return context;
};


export {useLayout, LayoutProvider};

