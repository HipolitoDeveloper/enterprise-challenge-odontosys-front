import {ChakraProvider} from "@chakra-ui/react";
import {appWithTranslation} from "next-i18next";

import type {AppProps} from "next/app";
import {QueryClient, QueryClientProvider} from "react-query";
import {SessionProvider, useSession} from "next-auth/react";
import {NextPage} from "next";
import {theme} from "../theme.config";
import '../styles/index.css';
import {LayoutProvider} from "../hooks/layout/useLayout";

export type NextPageWithAuth = NextPage & {
    auth?: boolean;
};


type AppPropsWithAuth = AppProps & {
    Component: NextPageWithAuth;
};

const queryClient = new QueryClient();

function MyApp({Component, pageProps: {session, ...pageProps}}: any) {

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                <ChakraProvider resetCSS theme={theme}>
                    <style jsx global>{`
                      html,
                      body,
                      body > div:first-child,
                      div#__next,
                      div#__next > div {
                        height: 100%;
                      }

                      * {
                        box-sizing: border-box;
                      }
                    `}</style>
                    <LayoutProvider>
                    <AuthProvider>
                        <Component {...pageProps} />
                    </AuthProvider>
                    </LayoutProvider>
                </ChakraProvider>
            </SessionProvider>
        </QueryClientProvider>

    )
        ;
}

const AuthProvider: React.FC = ({children}: any) => {
    const {data: session} = useSession({required: true});
    const isUser = session?.user !== undefined;

    // return <>{isUser ? children : <Loading loading={isUser} />}</>;

    return children
};

export default appWithTranslation(MyApp);
