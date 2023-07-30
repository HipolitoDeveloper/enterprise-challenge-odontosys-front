import {useTranslation} from "next-i18next";
import {useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {IAction} from "../../../components/table/@types/Table.types";
import {Constants} from "../../../common/Constants";
import {deletePatient, getPatients} from "./patient.service";
import {useGenericMutation} from "../../../hooks/react-query/useGenericMutation";
import TableLayout from "../../../components/layouts/TableLayout";
import {useGenericQuery} from "../../../hooks/react-query/useGenericQuery";
import {useTabLayout} from "../../../hooks/layout/useTabLayout";
import { Pages } from "../../../common/MenuItems";
import {patientColumns} from "./patient.schema";

export const PatientsPage = ({}) => {
        const {
            isLoading,
            data = [],
        } = useGenericQuery(Constants.URL_PATIENT, async () => await getPatients(), {
            retry: false
        })
        const onDelete: any = useGenericMutation(async (data) => await deletePatient(data), Constants.URL_PATIENT, (oldData, newData) => oldData.map((item: any) => {
            if (item.id === newData.id) {
                item.active = false
            }
            return item
        }))

        const {t} = useTranslation("form")
        const router = useRouter()
        const toast = useToast()
        const {handleLoading, handleCurrentPage, handleModal, modal} = useTabLayout()

        const columns = patientColumns.map(({Header, ...column}) => {
            return {Header: t(Header), ...column}
        })

        const action: IAction =
            {
                edit: (rowData: any = 0) => {
                    handleCurrentPage(Pages.PatientForm, {id: rowData.original.id}, false)
                },
                delete: async (rowData: any = 0) => {
                    try {
                        handleLoading(true)
                        await onDelete.mutateAsync(rowData.original.id)
                        handleLoading(false)
                        toast({
                            title: t("SUCCESS"),
                            description: t("SUCCESS_DELETE"),
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                        })
                    } catch (error) {
                        handleLoading(false)
                        handleModal({
                            ...modal,
                            visible: true,
                            variant: "error",
                            errors: error,
                        });
                    }
                }
            }

        const handlePagination = (page: number, pageSize: number) => {
            return {
                page, pageSize
            }
        }
        const {page, pageSize} = handlePagination(1, 10)


        return (
            <TableLayout title="Categorias"
                         columns={columns}
                         data={data.filter((item: any) => item.active)}
                         loading={isLoading}
                         action={action}
                         onInsert={() =>  handleCurrentPage(Pages.PatientForm)}
            >
            </TableLayout>
        );
    }
;
// PatientsPage.auth = true;



