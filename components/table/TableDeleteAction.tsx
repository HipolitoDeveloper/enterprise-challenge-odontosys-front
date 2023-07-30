import React from "react";
import {
    HStack,
    IconButton,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Tooltip,
    useDisclosure,
    UseDisclosureProps
} from "@chakra-ui/react";
import Button from "../Button";
import * as IconFA from "react-icons/fa";

interface Props extends UseDisclosureProps {
    onConfirm(): void;
}

export const TableDeleteAction: React.FC<Props> = ({onConfirm}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <Popover isOpen={isOpen} placement={'top-start'}>
            <PopoverTrigger>
                <Tooltip label='Excluir' placement='top' color='white' bg='bg'>
                    <IconButton aria-label='action-edit-button' variant='blank'
                                color='bg' onClick={() => onOpen()}>
                        <IconFA.FaTrashAlt size={15} color="inherit"/>
                    </IconButton>
                </Tooltip>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>Tem certeza que deseja realizar essa exclusão?</PopoverHeader>
                <PopoverBody>
                    <HStack>
                        <Button
                            variant={'filled'}
                            onClick={() => {
                                onConfirm()
                                onClose()
                            }}
                            h='20px'
                            style={{fontSize: '14px'}}>Confirmar</Button>
                        <Button
                            variant={'danger'}
                            onClick={onClose}
                            h='20px'
                            style={{fontSize: '14px'}}
                        >Cancelar</Button>

                    </HStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
