import {Box, Center, Flex, GridItem, SimpleGrid, Skeleton, Text} from "@chakra-ui/react";
import React, {useEffect} from "react";
import * as IconFA from "react-icons/fa";
import {IFormProperty} from "../../interfaces/IFormProperty";
import {Controller} from "react-hook-form";
import Input from "../form/Input";
import Button from "../Button";
import {useTranslation} from "next-i18next";
import Select from "../form/Select";
import Checkbox from "../form/Checkbox";
import Header from "../header/Header";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerInput from "../form/DatePickerInput";
import br from 'date-fns/locale/pt-BR';
import {useTabLayout} from "../../hooks/layout/useTabLayout";
import {Pages} from "../../common/MenuItems";
import TabHeader from "../menus/tabs/TabHeader";
import {useLayout} from "../../hooks/layout/useLayout";

interface Props {
    title: string;
    templateColumns: string;
    templateRows: string;
    items: IFormProperty[];
    submitButtonName: string;

    onSubmit(): void;

    resetForm(): void;

    loading: boolean;
    register: any;
    getFieldState: any;
    control?: any;
    lastPage: Pages

}

registerLocale('br', br)

const FormLayout: React.FC<Props> = ({
                                         title,
                                         templateColumns,
                                         templateRows,
                                         items,
                                         submitButtonName,
                                         onSubmit,
                                         loading,
                                         register,
                                         getFieldState,
                                         control,
                                         resetForm,
                                         lastPage
                                     }) => {
    const {t} = useTranslation("form");
    const {changeNavSize, handleCurrentPage} = useTabLayout()
    const {isMobile} = useLayout()

    useEffect(() => {
        changeNavSize('small')
    }, [])

    const renderInputComponent = ({
                                      name,
                                      type,
                                      fieldType,
                                      label,
                                      placeholder,
                                      order,
                                      options,
                                      defaultValue,
                                      width,
                                      readOnly
                                  }: IFormProperty) => {
        const {error} = getFieldState(name)
        const inputs = {
            "select": () => (
                <Select placeholder={t(placeholder)} name={name} variant='form' error={error}
                        defaultValue={defaultValue}
                        label={t(label)} width={width} options={options} register={register(name)}/>
            ),
            "input": () => <Input placeholder={t(placeholder)} name={name} type={type} variant='form' error={error}
                                  label={t(label)} width={width} register={register(name)}
                                  defaultValue={defaultValue} readOnly={readOnly}/>,
            "checkbox": () => <Checkbox name={name} register={register(name)}>
                <Center h='100%'>
                    <Text>{t(placeholder)}</Text>
                </Center>
            </Checkbox>,
            "date": () => (
                <Controller
                    name={name}
                    control={control}
                    render={({field: {onChange, value}}) => (
                        <DatePicker selected={value}
                                    onChange={onChange}
                                    dateFormat="dd/mM/yyyy"
                                    customInput={<DatePickerInput placeholder={t(placeholder)}
                                                                  name={name}
                                                                  variant='form'
                                                                  error={error}
                                                                  label={t(label)} width={"90%"}/>}/>)}
                />
            ),
            "def": () => <Input placeholder={t(placeholder)} name={name} variant='form'
                                label={t(label)} width={width} register={register(name)}/>
        }

        // @ts-ignore
        return inputs[fieldType]() || inputs.def
    }

    const renderInput = items.map(({colSpan, width, ...item}, index) => (
        <GridItem  key={index} h='120px' colSpan={colSpan ?? 1}>
            {loading ? (
                <Box mt={10}>
                    <Skeleton
                        height='50px'
                        w='20rem'
                    />
                </Box>
            ) : (
                renderInputComponent(item)

            )}
        </GridItem >
    ))

    const cancel = () => {
        handleCurrentPage(lastPage, null, false)
        resetForm()

    }

    window.onkeydown = ({code}) => {
        switch (code) {
            case "F4":
                onSubmit();
                break;
            case "F3":
                cancel()
                break;

            default:
        }
    }

    return (
        <Flex w='100%' h='100%' overflowY='scroll'
        >
            <Flex direction='column' w='100%' bg={'blueLight'}>
                <Header/>
                <TabHeader/>
                <Flex direction="column" justify='space-between' m='50px auto' w='95%' p={5}
                      boxShadow="0 4px 12px -1px rgba(0, 0, 0, 0.2)" backgroundColor='white'>
                    <Flex direction={'row'} align={'center'} justify={'space-between'}
                          p='10px 0' borderBottom='1px solid #005492'>
                        <Text color='bg' fontSize='25px' fontWeight='bold'>
                            {title}
                        </Text>
                        <Flex direction='row' align='center' justify='space-between'>
                            <Box>
                                <Button variant='filled' size='lg' submit onClick={onSubmit}>
                                    <IconFA.FaCheck size={20} color='inherit'/>
                                    <Text fontSize='15px' ml='10px'>{submitButtonName} (F4)</Text>
                                </Button>
                            </Box>
                            <Flex align='flex-end' justify='flex-end'>
                                <Button
                                    onClick={cancel}
                                    variant='solid'
                                    size='lg'
                                    style={{backgroundColor: 'indianred'}}
                                    m={'0 5px'}>
                                    <IconFA.FaTimes size={20} color='inherit'/>
                                    <Text fontSize='15px' ml='10px'>Cancelar (F3)</Text>
                                </Button>
                            </Flex>

                        </Flex>
                    </Flex>
                    <form onSubmit={onSubmit} style={{height: '95%'}}>
                        <SimpleGrid templateColumns='repeat(12, 1fr)' gap={4} w='100%'>
                            {renderInput}
                        </SimpleGrid>

                    </form>
                </Flex>
            </Flex>
        </Flex>
    )
        ;
}

export default FormLayout
