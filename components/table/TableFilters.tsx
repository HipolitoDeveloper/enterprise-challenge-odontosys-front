import {Flex, Grid, GridItem} from "@chakra-ui/react";
import React from "react";
import * as IconFA from "react-icons/fa";
import Input from "../form/Input";
import Button from "../Button";
import {useTranslation} from "next-i18next";
import Select from "../form/Select";
import MultiSelect from "../form/MultiSelect";
import {IColumn} from "./@types/Table.types";
import {useTabLayout} from "../../hooks/layout/useTabLayout";

interface FilterProps {
    columns: IColumn[];
    searchRef: any;
    searchedCodes: string[];


    handleSearch(search: string): any;

    handleColumns(columns: any): any;

    onSearchCode(codes: string[]): any;

    clearSearchCode(): any
}


const TableFilters: React.FC<FilterProps> = ({
                                                 columns,
                                                 handleSearch,
                                                 handleColumns,
                                                 onSearchCode,
                                                 clearSearchCode,
                                                 searchedCodes,
                                                 searchRef
                                             }) => {
    const {t} = useTranslation("form");

    const {modal, handleModal} = useTabLayout()

    return (
        <Grid w='90%' m='0 auto' templateColumns="repeat(4, 1fr)" templateRows='repeat(1, 1fr)'>
            <GridItem colSpan={2}>
                <Input
                    forwardedRef={searchRef}
                    placeholder={"Pesquisar..."}
                    variant="inline"
                    width="100%"
                    height='30px'
                    onChange={(event) => handleSearch(event.target.value)}
                    // rightAdornment={
                    //     <IconButton aria-label={'search-button'}>
                    //         <IconFA.FaSearch size={20} color='white'/>
                    //     </IconButton>
                    // }
                />

            </GridItem>
            <GridItem>
                <Button size={'lg'}
                        fontSize='14px'
                        variant='ghost'
                        onClick={() => handleModal({
                            ...modal,
                            title: 'Busque por códigos',
                            visible: true,
                            variant: "search",
                            onSearchCode: (codes: string[]) => onSearchCode(codes),
                            clearSearchCode: clearSearchCode,
                            codes: searchedCodes
                        })}>
                    Códigos
                    <IconFA.FaSearch
                        style={{marginLeft: 5}}
                        size={15}>
                        Search
                    </IconFA.FaSearch>
                </Button>
            </GridItem>
            <GridItem colSpan={1}>
                <MultiSelect columns={columns} onChange={handleColumns}
                             title={
                                 <Flex direction={'row'} align={'center'} justify={'center'}>
                                     Colunas <IconFA.FaEye size={14} style={{marginLeft: 5}}/>
                                 </Flex>}/>
            </GridItem>
        </Grid>
    );
}

export default TableFilters
