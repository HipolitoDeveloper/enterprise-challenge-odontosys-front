import React from "react";
import {IRoute} from "../../interfaces/IRoute";
import {PatientsPage, PatientPage} from "../../module/form/patient";

import {DoctorPage, DoctorsPage} from "../../module/form/doctor";
import {useTabLayout} from "../../hooks/layout/useTabLayout";
import {Pages} from "../../common/MenuItems";
import {DashboardPage} from "../../module/dashboard";


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
