import React from "react";
import DynamicPage from "../components/layouts/DynamicPage";
import Tabs from "../components/menus/tabs/Tabs";
import {TabLayoutProvider} from "../hooks/layout/useTabLayout";
import {NextPageWithAuth} from "./_app";
import {NextPageContext} from "next";
import {getSession} from "next-auth/react";
import nookies from "nookies";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";



const Odontosys: NextPageWithAuth = () => {
    const TabsProvider: any = dynamic(
        () => import('../hooks/layout/useTabs'),
        {
            ssr: false,
        }
    );
    return (
        <TabsProvider>
            <Tabs>
                <TabLayoutProvider>
                    <DynamicPage/>
                </TabLayoutProvider>
            </Tabs>
        </TabsProvider>
    )
}

export default Odontosys

Odontosys.auth = true;

export const getServerSideProps = async ({locale, ...context}: NextPageContext) => {
    const {req} = context;
    const session = await getSession({req});

    nookies.set({...context}, 'accessToken', session?.accessToken as string, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    });

    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common","form"])),
        },
    }
};

