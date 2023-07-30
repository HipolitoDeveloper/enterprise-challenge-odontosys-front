import type {NextPageContext} from "next";
import {getSession, getCsrfToken} from "next-auth/react";

import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import LoginPage from "./login";

export const getServerSideProps = async ({locale, ...context}: NextPageContext) => {
    const {req} = context;
    const session = await getSession({req});
    if (session) {

        return {
            redirect: {destination: '/login'},
        };
    } else {
        return {
            redirect: {destination: '/login'},
        };
    }

    return {
        props: {
            ...(await serverSideTranslations(locale || 'pt-BR', ['common'])),
            csrfToken: await getCsrfToken(context),

        },
    };
};

export default LoginPage;
