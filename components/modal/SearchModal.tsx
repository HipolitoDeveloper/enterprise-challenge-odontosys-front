import {Flex, ModalBody, ModalContent, Text, VStack,} from "@chakra-ui/react";
import Button from "../Button";
import React, {useEffect, useRef, useState} from "react";
import * as IconFA from "react-icons/fa";
import TextArea from "../form/TextArea";
import {TModal} from "./index";



const SearchModal: React.FC<TModal> = ({title, onClose, onSearchCode, clearSearchCode, codes: searchedCodes}) => {
    const [codes, setCodes] = useState<string[]>()
    const inputRef = useRef<any>(null)
    const [codesText, setCodesText] = useState<string>('')

    useEffect(() => {
        setCodesText(searchedCodes ? searchedCodes.toString() : "")
        formatCodesToSearch(searchedCodes ? searchedCodes.toString() : "")
    }, [searchedCodes])

    const formatCodesToSearch = (codes: string) => {
        const codesList = codes.split('\n');
        setCodes(codesList)
    }

    const clearFilter = () => {
        setCodes([])
        clearSearchCode()
        setCodesText('')
    }

    return (
        <ModalContent>
            <ModalBody>
                <VStack spacing={10}>
                    <Flex justifyContent={'flex-start'}>
                        <Text fontSize={"20px"} fontWeight={"bold"}>
                            {title}
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" alignItems={'center'} w={'100%'}>
                        <TextArea
                            value={codesText}
                            onChange={(event) => {
                                formatCodesToSearch(event.target.value)
                                setCodesText(event.target.value)
                            }}
                            placeholder={"Ex: xxx\nxxx\nxxx"}

                        />
                    </Flex>
                    <Flex flexDirection="row" alignItems={'center'} justify={'space-between'} w={'100%'}>
                        <Button size={'md'}  onClick={() => onSearchCode(codes)}>
                            Pesquisar <IconFA.FaSearch style={{marginLeft: 5}} size={20}/>
                        </Button>

                        <Button size={'sm'} onClick={() => {
                            // clearFilter()
                            onClose()
                        }} style={{backgroundColor: 'indianred'}}>
                            <IconFA.FaTimes style={{marginLeft: 5}} size={20}/>
                        </Button>
                    </Flex>
                </VStack>
            </ModalBody>
        </ModalContent>
    );
}

export default SearchModal
