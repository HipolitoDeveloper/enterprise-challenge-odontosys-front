import NextAuth, {NextAuthOptions} from "next-auth"
import {NextApiRequest, NextApiResponse} from 'next';

import CredentialsProvider from "next-auth/providers/credentials"
import {apiPost, AxiosClient} from "../../../hooks/api/useApi";
import axios from "axios";
import {Constants} from "../../../common/Constants";


const options: NextAuthOptions = {
    pages: {
        error: '/login',
        signOut: '/login',
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            credentials: {},
                name: "Credentials",
                async authorize(credentials) {
                    try {
                        // const {data: responseData} = await AxiosAuth.post(Constants.BASE_URL_AUTH, credentials);

                        // const {retorno, sucesso} = responseData
                        if (true) {
                            return {
                                accessToken: 'autorizado',
                                id: "", options: undefined, type: "credentials",

                            }
                        } else {
                            return null
                        }

                    } catch (error: any) {
                        throw new Error(error)
                    }
                }
            }
        ),
    ],
    callbacks: {
        async jwt({token, user}: any) {
            if (user) {
                token.accessToken = user?.token
            }

            return token
        },
        async session({session, token, user}: any) {
            session.accessToken = token.accessToken

            return session

        }
    }
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
