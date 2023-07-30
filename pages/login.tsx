import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import { LoginPage } from "../module/login";

export default LoginPage;


export const getServerSideProps = async ({locale}: any) => ({
    props: {
        ...(await serverSideTranslations(locale , ["common"])),
    },
});
