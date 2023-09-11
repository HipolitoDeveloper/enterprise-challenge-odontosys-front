import React from "react";
import {IRoute} from "../../interfaces/IRoute";
import {PatientsPage, PatientPage} from "../../module/form/patient";

import {DoctorPage, DoctorsPage} from "../../module/form/doctor";
import {useTabLayout} from "../../hooks/layout/useTabLayout";
import {Pages} from "../../common/MenuItems";
import {DashboardPage} from "../../module/dashboard";
import {OfficesPage} from "../../module/form/office/offices.page";
import {OfficeFormPage} from "../../module/form/office/office.page";
import {ConsultsPage} from "../../module/form/consult/consults.page";
import { ConsultFormPage } from "../../module/form/consult/consult.page";
import {ProceduresPage} from "../../module/form/procedures/procedures.page";
import {ProcedureFormPage} from "../../module/form/procedures/procedure.page";


const DynamicPage: React.FC<{ initialPage?: Pages }> = ({initialPage}) => {
    const {handleCurrentPage, currentPage} = useTabLayout()

    const routes: IRoute[] = [
        {
            slug: "dashboard",
            component: <DashboardPage {...currentPage.params}/>,
            group: 'DAS'
        },
        {
            slug: "doctors",
            component: <DoctorsPage {...currentPage.params}/>,
            group: 'DOC'
        },
        {
            slug: "doctor",
            component: <DoctorPage {...currentPage.params}/>,
            group: 'DOC'
        },
        {
            slug: "patients",
            component: <PatientsPage {...currentPage.params}/>,
            group: 'PAT'
        },
        {
            slug: "patient",
            component: <PatientPage {...currentPage.params}/>,
            group: 'PAT'
        },
        {
            slug: "offices",
            component: <OfficesPage {...currentPage.params} />,
            group: 'OFF'
        },
        {
            slug: "office",
            component: <OfficeFormPage {...currentPage.params} />,
            group: 'OFF'
        },
        {
            slug: "consults",
            component: <ConsultsPage {...currentPage.params} />,
            group: 'CON'
        },
        {
            slug: "consult",
            component: <ConsultFormPage {...currentPage.params} />,
            group: 'CON'
        },
        {
            slug: "procedures",
            component: <ProceduresPage {...currentPage.params} />,
            group: 'PROC'
        },
        {
            slug: "procedure",
            component: <ProcedureFormPage {...currentPage.params} />,
            group: 'PROC'
        }

    ]


    // useEffect(() => {
    //     console.log("currentPage",currentPage)
    //     if(!currentPage) handleCurrentPage(Pages.Dashboard)
    // }, [currentPage])


    const page = routes.find(route => route.slug === currentPage.page)?.component


    return (
        <>
            {page}
        </>
    )
}

export default DynamicPage
