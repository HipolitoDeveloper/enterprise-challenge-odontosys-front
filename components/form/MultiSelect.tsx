import {Button, Flex, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup} from "@chakra-ui/react";
import React from "react";
import {useTranslation} from "next-i18next";
import {IColumn} from "../table/@types/Table.types";

interface Props {
    columns: IColumn[],
    title: any,
    onChange(value: string | string[] | undefined): void

}

const MultiSelect: React.FC<Props> = ({
                                          columns,
                                          onChange,
                                          title
                                      }) => {


    const {t} = useTranslation("form");
    return (
        <Flex align="center" justify='center' h='100%'>
            <Flex align="flex-start" direction="column" justify="center" flex="1">


                {/*<SelectC {...register} name={name} placeholder={placeholder} variant={variant} >*/}
                {/*    {options?.map(({value, name}: any, index: any) => (*/}
                {/*        <option key={index} value={value}>{name}</option>*/}
                {/*    ))}*/}
                {/*</SelectC>*/}

                <Menu closeOnSelect={false}>
                    <MenuButton as={Button} colorScheme='blue' size='md' h='30px' fontSize='14px'>
                        {title}
                    </MenuButton>
                    <MenuList minWidth='200px'>
                        <MenuOptionGroup fontSize='14px' title='Colunas' type='checkbox' defaultValue={columns.map(column => column.accessor)} onChange={(value) => onChange(value)} _selected={{border: '1px solid red'}}>
                            {columns.map(({Header, accessor}, index) => (
                                <MenuItemOption h='25px' key={index} value={accessor} >{Header}</MenuItemOption>
                            ))}

                        </MenuOptionGroup>
                    </MenuList>
                </Menu>

            </Flex>
        </Flex>
    );
}

export default MultiSelect;

const styles = {
    searchIcon: {
        position: "relative",
        top: 35,
        left: 20,
    },
};
