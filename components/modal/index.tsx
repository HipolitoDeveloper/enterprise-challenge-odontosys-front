import {Modal as ChakraModal, ModalOverlay,} from "@chakra-ui/react";
import React, {useCallback} from "react";
import AlertModal from "./AlertModal";
import ErrorModal from "./ErrorModal";
import SearchModal from "./SearchModal";

export type TModal = TSearchModal & TErrorModal & {
    variant?: "error" | "alert" | 'search';
    visible?: boolean;
    title?: string;
    text?: string;
    onOk?: any;
    okTitle?: string;
    onClose?: any;
    cancelTitle?: string;
    children?: any;
    errors?: any;
}

export type TErrorModal = {
    errors?: any
}

export type TSearchModal = {
    onSearchCode?: any
    clearSearchCode?: any
    codes?: string[];
}

const Modal: React.FC<TModal> = ({
                                     variant = 'alert',
                                     visible,
                                     title,
                                     text,
                                     onOk,
                                     okTitle,
                                     onClose,
                                     cancelTitle,
                                     children,
                                     errors,
                                     onSearchCode,
                                     clearSearchCode,
                                     codes

                                 }) => {
    const renderModal = useCallback(() => ({
        ["alert"]: <AlertModal title={title} onClose={onClose}/>,
        ["error"]: <ErrorModal onClose={onClose} errors={errors}/>,
        ['search']: <SearchModal codes={codes} title={title} onClose={onClose}
                                 onSearchCode={onSearchCode} clearSearchCode={clearSearchCode}/>,
    }), [onClose, title]);


    return (
        <ChakraModal isOpen={visible || false} onClose={onClose} closeOnOverlayClick={true}>
            <ModalOverlay/>
            {renderModal()[variant]}
        </ChakraModal>
    );
}

export default Modal
