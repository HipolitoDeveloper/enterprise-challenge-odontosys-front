import {
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Center,
    Flex,
} from "@chakra-ui/react";
import Button from "../Button";
import Input from "../form/Input";
import React from "react";
import {TModal} from "./index";


const AlertModal: React.FC<TModal> = ({title, onClose}) => {
    return (
        <ModalContent>
            <ModalBody>
                <Flex justifyContent={'flex-end'}>
                    <Button variant="rounded" onClick={onClose}/>
                </Flex>
                <Flex flexDirection="column" alignItems={'center'}>
                    <div>ICONE</div>
                    <Text fontSize={"20px"} fontWeight={"bold"}>
                        {title}
                    </Text>
                </Flex>
            </ModalBody>
        </ModalContent>
    );
}

export default AlertModal
