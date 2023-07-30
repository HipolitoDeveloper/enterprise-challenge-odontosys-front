import {useTranslation} from "next-i18next";
import {useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {IAction} from "../../../components/table/@types/Table.types";
import {Constants} from "../../../common/Constants";
import {deleteDoctor, getDoctors} from "./doctor.service";
import {doctorColumns} from "./doctor.schema";
import {useGenericMutation} from "../../../hooks/react-query/useGenericMutation";
import TableLayout from "../../../components/layouts/TableLayout";
import {useGenericQuery} from "../../../hooks/react-query/useGenericQuery";
import {useTabLayout} from "../../../hooks/layout/useTabLayout";
import {Pages} from "../../../common/MenuItems";


export const DoctorsPage = ({}) => {
        const {isLoading, error, data=[], isFetching} = useGenericQuery(Constants.URL_DOCTOR, async () => await getDoctors(), {
            // staleTime: 60000 * 5
        })

    const onDelete: any = useGenericMutation(async (data) => await deleteDoctor(data), Constants.URL_DOCTOR, (oldData, newData) => oldData.filter((item: any) => item.id !== newData))
        const {t} = useTranslation("form")
        const router = useRouter()
        const toast = useToast()
    const {handleLoading, handleCurrentPage} = useTabLayout()


        const columns = doctorColumns.map(({Header, ...column}) => {
            return {Header: t(Header), ...column}
        })

        const action: IAction =
            {
                edit: (rowData: any = 0) => {
                    handleCurrentPage(Pages.DoctorForm, {id: rowData.original.id}, false)

                },
                delete: async (rowData: any = 0) => {
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
                }
            }

        return (
            <TableLayout title="Médicos"
                         columns={columns}
                         data={data}
                         loading={isLoading}
                         action={action}
                         onInsert={() =>  handleCurrentPage(Pages.DoctorForm)}
            >

            </TableLayout>
        );
    }
;
DoctorsPage.auth = true;



