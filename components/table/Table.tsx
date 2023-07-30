import {
    Center,
    Flex,
    HStack,
    IconButton,
    Select,
    Table as ChakraTable,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tooltip,
    Tr
} from "@chakra-ui/react";
import React, {useMemo} from "react";
import {Cell, usePagination, useRowSelect, useSortBy, useTable} from "react-table";
import TableCheckbox from "./TableCheckbox";
import {IAction, IColumn} from "./@types/Table.types";
import * as IconFA from "react-icons/fa";
import {useTranslation} from "next-i18next";
import Button from "../Button";
import TableLoading from "./TableLoading";
import {TableDeleteAction} from "./TableDeleteAction";
import moment from "moment";
import {advertisementType} from "../../common/Enums";

export interface TableProps {
    columns: IColumn[];
    data: any;
    loading: boolean;
    action: IAction;
    navSize?: string;
}

export const Table: React.FC<TableProps> = ({columns, data, loading, action, navSize}) => {
    const memoizedColumns: IColumn[] = useMemo(() => [...columns], [columns])
    const {t} = useTranslation("common")

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        prepareRow,
        selectedFlatRows,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable(
        {
            columns: memoizedColumns,
            data: data || [],
            autoResetHiddenColumns: false,
            autoResetSortBy: false,
            autoResetPage: false,
            autoResetSelectedRows: false,
            initialState: {pageIndex: 0},
        },
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            // @ts-ignore
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',

                    Header: ({getToggleAllRowsSelectedProps}) => (
                        <Center>
                            <TableCheckbox {...getToggleAllRowsSelectedProps()} />
                        </Center>
                    ),

                    Cell: ({row}) => (
                        <Center>
                            <TableCheckbox {...row?.getToggleRowSelectedProps()} />
                        </Center>
                    ),
                },
                ...columns,
            ])
        }
    )

    const handleData = (cell: any) => {
        let cellValue = cell.render('Cell')

        if(cell.column?.formatter) {
            cellValue = moment(cell.render('Cell').props.cell.value).format(cell.column.formatter)
        } else if(cell.column?.convert) {
            if(cell.column?.convert.enum === 'ADVERTISEMENT') {
                cellValue =  advertisementType.find(ad => ad.value === cell.render('Cell').props.cell.value)?.name
            }
        }

        return cellValue
    }

    return (
        < >
            <TableContainer h='90%' w='100%' mb='10px' overflowX='visible' css={{
                transform: "rotateX(180deg)",
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
                <ChakraTable variant='simple'
                             {...getTableProps()}
                             transform="rotateX(180deg)"
                >
                    <Thead>
                        {headerGroups.map((headerGroup, index) => (
                            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                {headerGroup.headers.map((column, index) => (

                                    <Th pl="10px" {...column.getHeaderProps(column.getSortByToggleProps())}
                                        key={index}>
                                        {column.render('Header')}
                                        <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? ' 🔽'
                                                            : ' 🔼'
                                                        : ''}
                                                 </span>
                                    </Th>
                                ))}
                                <Th w='2%'>
                                    {/*{t("ACTIONS")}*/}
                                </Th>
                            </Tr>

                        ))}
                    </Thead>
                    <TableLoading loading={loading}/>
                    <Tbody>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <Tr {...row.getRowProps()} key={i} onDoubleClick={() => action.edit(row)}>
                                    {row.cells.map((cell: Cell | any, index) => (
                                            // eslint-disable-next-line react/jsx-key
                                            <Td pt={0} pb={0}
                                                w='4%' {...cell.getCellProps()}>

                                                {handleData(cell)}

                                            </Td>
                                        )
                                    )}
                                    <Td pt={0} pb={0} w='1%'>
                                        <HStack spacing="-20px">
                                            <Tooltip label='Editar' placement='top' color='white' bg='bg'>
                                                <IconButton aria-label='action-edit-button' variant='blank'
                                                            color='bg'
                                                            onClick={() => action.edit(row)}>
                                                    <IconFA.FaPen size={15} color="inherit"/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip label='Visualizar' placement='top' color='white' bg='bg'>
                                                <IconButton aria-label='action-edit-button' variant='blank'
                                                            color='bg'
                                                            onClick={() => action.edit(row)}>
                                                    <IconFA.FaCopy size={15} color="inherit"/>
                                                </IconButton>
                                            </Tooltip>


                                            <TableDeleteAction onConfirm={() => action.delete(row)}/>
                                        </HStack>
                                    </Td>
                                </Tr>
                            )
                        })
                        }
                    </Tbody>

                </ChakraTable>
            </TableContainer>

            <Flex align="center" position='fixed' h='20px' bottom='0px' justify='space-around' w='100%'
                  backgroundColor="lightBlue">
                <HStack>
                    <Text color='bg' fontWeight='bold' mb="4px">
                        Linhas por página:
                    </Text>
                    <Select w='100px' variant={"pagination"} value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value));
                            }}>
                        {[8, 10, 15, 20, 25, 50, 100]?.map((value) => (
                            <option key={value} value={value}>{value}</option>
                        ))}
                    </Select>
                </HStack>

                <Flex direction='row' h='100%'>
                    <Button variant="blank"
                            h='100%'
                            onClick={() => {
                                previousPage();
                            }}
                            disabled={!canPreviousPage}>
                        <Text color='bg'>{'<'}</Text>
                    </Button>
                    <Text h='100%' w='200px' color='bg' fontWeight='bold'>
                        {pageIndex + 1} de {pageOptions.length}
                    </Text>
                    <Button variant="blank"
                            h='100%'
                            onClick={() => {
                                nextPage();
                            }}
                            disabled={!canNextPage}>
                        <Text color='bg'>{'>'}</Text>
                    </Button>
                </Flex>

            </Flex>
        </>

    )
}
