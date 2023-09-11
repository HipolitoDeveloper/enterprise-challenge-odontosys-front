import NextAuth, {NextAuthOptions} from "next-auth"
import {NextApiRequest, NextApiResponse} from 'next';

import CredentialsProvider from "next-auth/providers/credentials"

type User = {
    id: string;
    accessToken: string;
};

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
                async authorize(credentials): Promise<User | null> {
                    try {
                        if (true) {
                            return {
                                id: "",
                                accessToken: 'autorizado'
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
