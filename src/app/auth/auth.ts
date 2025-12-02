import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/utils/prisma";
import {getInjection} from "@/di/container";
import {Routes} from "@/app/routes";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Account",
            credentials: {
                username: { label: "Username", type: "username" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    const signInController = getInjection('ISignInController');

                    const username = credentials?.username as string | undefined;
                    const password = credentials?.password as string | undefined;

                    return await signInController({username, password});
                } catch (error) {
                    console.error(error);
                    return null;
                }
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 3600
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = { id: token.id } as any;
            return session;
        },
    },
    pages: {
        signIn: Routes.SignIn
    }
});
