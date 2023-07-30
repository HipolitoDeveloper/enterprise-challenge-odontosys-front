import {Box, FilterProps, Flex, Grid, GridItem, Text} from "@chakra-ui/react";

import React, {useEffect, useRef, useState} from "react";
import * as IconIO from "react-icons/io5";
import Button from "../Button";
import {useTranslation} from "next-i18next";
import {Table, TableProps} from "../table/Table";
import Header from "../header/Header";
import {useRouter} from "next/router";
import TableFilters from "../table/TableFilters";
import {useTabs} from "../../hooks/layout/useTabs";
import TabHeader from "../menus/tabs/TabHeader";
import {useLayout} from "../../hooks/layout/useLayout";
import {useTabLayout} from "../../hooks/layout/useTabLayout";

interface Props extends TableProps, FilterProps {
    title: string;

    onInsert(): void;


}

interface ISearchRgx {
    regex: any;
    property: string;
}

const TableLayout: React.FC<Props> = ({
                                          title,
                                          children,
                                          columns,
                                          data,
                                          loading,
                                          action,
                                          onInsert,
                                      }) => {

    const [excludedColumns, setExcludedColumns] = useState<string[]>([])
    const [searchedCodes, setSearchedCodes] = useState<string[]>([])
    const [filteringCode, setFilteringCode] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")

    const searchRef = useRef<any>();
    const {t} = useTranslation("form");
    const router = useRouter()
    const {navSize} = useTabLayout()

    const searchRegexProperties = columns.map(column => column.accessor)

    const handleSearch = (search: string) => {
        setSearch(search)
    }

    const handleColumns = (excludedColumns: string[]) => {
        const newExcludedColumns: string[] = [];

        columns.forEach(column => {
            if (!excludedColumns.some(excludedColumn => excludedColumn === column.accessor)) {
                newExcludedColumns.push(column.accessor)
            }
        })

        setExcludedColumns(newExcludedColumns)
    }

    const searchCode = (codes: string[]) => {
        setSearchedCodes(codes)
        setFilteringCode(true)
    }

    const filterData = () => {
        const regex = new RegExp(`${search.trim()}`, "i");
            return data.filter(
                (i: any) => {
                    let searcher: boolean[] = [];
                    searchRegexProperties.forEach(property => {
                        if (i[property]) {
                            searcher.push(filteringCode ? (searchedCodes.some(code => i.code === code.trim())) : i[property].toString()?.search(regex) >= 0)
                        }

                    })

                    return searcher.some(search => search)
                })
    }

    const clearFilters = () => {
        clearSearchCode()
        setFilteringCode(false)
        searchRef.current.value = ""
    }


    const clearSearchCode = () => {
        setSearchedCodes(data.map(({code}: any) => {
            return code
        }))
    }

    return (
        <Flex w='100%' h='100%' overflowY='hidden'
        >
            <Flex direction='column' w='100%'
                // m='30px 0  30px 60px'
            >
                <Header/>
                <TabHeader/>
                <Box mt='' overflowX='scroll'
                     css={{
                         '&::-webkit-scrollbar': {
                             width: '5px',
                             height: '10px'
                         },
                         '&::-webkit-scrollbar-track': {
                             width: '1px',
                         },
                         '&::-webkit-scrollbar-thumb': {
                             background: '#005492',
                             borderRadius: '5px',

                         },
                     }}>
                    <Flex direction="column" position='fixed' backgroundColor='white' zIndex={10} w={navSize === 'large' ? '79%' : '94%'} >
                        <Grid w='100%' templateColumns="repeat(5, 1fr)">
                            <GridItem>
                                <Text color='bg' fontSize='20px' fontWeight='bold'>
                                    {title}
                                </Text>
                            </GridItem>
                            <GridItem colSpan={4}>
                                <Flex alignItems='flex-end' justifyContent='flex-end' w='100%'>
                                    <Button variant='blank' w={'100px'}
                                            onClick={onInsert}>
                                        <Text justifyContent='center' w="100px" fontSize="16px" color="bg">
                                            <IconIO.IoDuplicateOutline size={30} color="inherit"/>
                                            Cadastrar
                                        </Text>

                                    </Button>
                                </Flex>
                            </GridItem>

                            {filteringCode && (
                                <GridItem>
                                    <Flex float={'left'} align='center'>
                                        <Button variant={'blank'} onClick={clearFilters}>
                                            <IconIO.IoClose size={20}/>
                                            Limpar filtros
                                        </Button>
                                    </Flex>
                                </GridItem>

                            )}
                        </Grid>

                        <TableFilters columns={columns} searchedCodes={searchedCodes} handleSearch={handleSearch}
                                      handleColumns={handleColumns} onSearchCode={searchCode}
                                      clearSearchCode={clearSearchCode} searchRef={searchRef}
                        />

                    </Flex>
                    <Flex
                        w="100%" mt='100px'>
                        <Table
                            columns={columns.filter(column => !excludedColumns.some(excluded => excluded === column.accessor))}
                            data={filterData()}
                            loading={loading} action={action}
                            navSize={navSize}
                          />
                    </Flex>
                </Box>
            </Flex>


        </Flex>
    )
        ;
}

export default TableLayout
