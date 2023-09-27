import {IMenuItem} from "../interfaces";
import {IRoute} from "../interfaces/IRoute";
import React from "react";


export enum Pages {
    Dashboard = 'dashboard',
    Doctors = 'doctors',
    DoctorForm = 'doctor',
    Patients = "patients",
    PatientForm = "patient",
    Offices = "offices",
    OfficeForm = "office",
    Consults = "consults",
    ConsultForm = "consult",
    Procedures = "procedures",
    ProcedureForm = "procedure",
    // Clinics = "clinics",
    // ClinicForm = "clinic",
    // Appointments = "appointments",
    // Appointment = "appointment",
    // Medicines = "medicines",
    // Medicine = "medicine",
    // Exams = "exams",
    // Exam = "exam",

}


export const MenuItems: IMenuItem[] = [
    {
        name: "Dashboard",
        route: Pages.Dashboard,
        type: 'unique',
        items: [],
        icon: "IoStatsChart"
    },
    {
        name: "Cadastros",
        type: 'multiple',
        route: Pages.Doctors,
        icon: "IoNewspaper",
        items: [
            // {
            //     name: "Exames",
            //     route: Pages.Exams,
            //     type: "unique",
            //     items: []
            // },
            // {
            //     name: "Medicamentos",
            //     route: Pages.Medicines,
            //     type: "unique",
            //     items: []
            // },
            // {
            //     name: "Consultas",
            //     route: Pages.Appointments,
            //     type: "unique",
            //     items: []
            // },
            // {
            //     name: "Clínicas",
            //     route: Pages.Clinics,
            //     type: "unique",
            //     items: []
            // },
            {
                name: "Pacientes",
                route: Pages.Patients,
                type: "unique",
                items: []
            },
            {
                name: "Médicos",
                route: Pages.Doctors,
                type: "unique",
                items: []
            },
            {
                name: "Consultórios",
                route: Pages.Offices,
                type: "unique",
                items: []
            },
            {
                name: "Consultas",
                route: Pages.Consults,
                type: "unique",
                items: []
            },
            {
                name: "Procedimentos",
                route: Pages.Procedures,
                type: "unique",
                items: []
            },
        ]
    },
    // {
    //     name: "Financeiro",
    //     route: Pages.Dashboard,
    //     type: 'unique',
    //     items: [],
    //     icon: "IoReceipt",
    // },
    // {
    //     name: "Fale Conosco",
    //     route: Pages.Dashboard,
    //     type: 'unique',
    //     items: [],
    //     icon: "IoPodium",
    // }
]

export const labelConversor = (page: Pages) => {
    const pages = {
        [Pages.Dashboard]: 'Dashboard',
        [Pages.Doctors]: 'Médicos',
        [Pages.DoctorForm]: 'Médico',
        [Pages.Patients]: 'Pacientes',
        [Pages.PatientForm]: 'Paciente',
        [Pages.Offices]: 'Consultórios',
        [Pages.OfficeForm]: 'Consultório',
        [Pages.Consults]: 'Consultas',
        [Pages.ConsultForm]: 'Consulta',
        [Pages.Procedures]: 'Procedimentos',
        [Pages.ProcedureForm]: 'Procedimento'
        // [Pages.Clinics]: 'Clínicas',
        // [Pages.Clinic]: 'Clínica',
        // [Pages.Appointments]: 'Consultas',
        // [Pages.Appointment]: 'Consulta',
        // [Pages.Medicines]: 'Medicamentos',
        // [Pages.Medicine]: 'Medicamento',
        // [Pages.Exams]: 'Exames',
        // [Pages.Exam]: 'Exame',
    }

    return pages[page]
}

export const routesGroup: Omit<IRoute, 'component'>[] = [
    {
        slug: "dashboard",
        group: 'DAS'
    },
    {
        slug: "doctors",
        group: 'DOC'
    },
    {
        slug: "doctor",
        group: 'DOC'
    },
    {
        slug: "patients",
        group: 'PAT'
    },
    {
        slug: "patient",
        group: 'PAT'
    },
    // {
    //     slug: "clinics",
    //     group: 'CLI'
    // },
    // {
    //     slug: "clinic",
    //     group: 'CLI'
    //
    // },
    // {
    //     slug: "appointments",
    //     group: 'APP'
    // },
    // {
    //     slug: "appointment",
    //     group: 'APP'
    // },
    // {
    //     slug: "medicines",
    //     group: 'MED'
    // },
    // {
    //     slug: "medicine",
    //     group: 'MED'
    // },
    // {
    //     slug: "exams",
    //     group: 'EXA'
    // },
    // {
    //     slug: "exam",
    //     group: 'EXA'
    // },
]


