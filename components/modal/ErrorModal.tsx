import {
    Modal as ChakraModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text
} from '@chakra-ui/react';
import {useTranslation} from 'next-i18next';
import {TModal} from "./index";



const ErrorModal = ({onClose, errors}: TModal) => {
    const {t} = useTranslation('common');

    return errors && errors.length > 0 && <ModalContent>
        <ModalHeader>{t('ERROR')}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody pb={6}>
            {errors?.map((error: string, index: number) => <Text key={index}>{error}</Text>)}
        </ModalBody>
    </ModalContent>;
};

export default ErrorModal;
