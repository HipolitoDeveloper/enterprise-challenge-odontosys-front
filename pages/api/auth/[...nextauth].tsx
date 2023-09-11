import NextAuth, {NextAuthOptions} from "next-auth"
import {NextApiRequest, NextApiResponse} from 'next';

import CredentialsProvider from "next-auth/providers/credentials"


// export const AxiosAuth = axios.create({
//     baseURL: Constants.BASE_URL_AUTHORIZATION,
// });

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
                authorize() {
                    return {
                        id: "", options: undefined, type: "credentials",
                    }
                }
            }
        ),
    ],
    callbacks: {
        async jwt({token, user}: any) {
            if (user) {
                token.accessToken = ""
            }

            return token
        },
        async session({session, token, user}) {

            return session

        }
    }
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
