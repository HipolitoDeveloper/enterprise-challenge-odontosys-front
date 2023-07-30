import {NextPage} from "next";
import {useEffect, useState} from "react";
import {Box} from "@chakra-ui/react";
import { NextPageWithAuth } from "../../pages/_app";
import { useSession } from "next-auth/react";
import MainLayout from "../../components/layouts/MainLayout";

export const DashboardPage = () => {
    // const { t } = useTranslation("common");
    const [keepConnected, setKeepConnected] = useState<boolean>(true);
    const { data: session, status } = useSession();

    // console.log("session", session)

    return (
        <MainLayout title="Dashboard"/>
    );
};

