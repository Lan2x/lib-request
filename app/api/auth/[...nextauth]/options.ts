import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import { comparePasswords } from "@/lib/utils";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "email...",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        console.log({
          email: credentials.email,
          password: credentials.password,
        });

        let user = await prismadb.tbl_user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            UserType: true,
          },
        });

        if (!user) {
          return null;
        }

        const passwordMatch = comparePasswords(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          ...user,
          firstName: user.first_name,
          middleName: user.middle_name,
          lastName: user.last_name,
        };
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) {
        token.id = Number(user.id);
        token.firstName = user.firstName;
        token.middleName = user.middleName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.UserType = user.UserType;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.UserType = token.UserType;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.middleName = token.middleName;
        session.user.email = token.email;
      }
      return session;
    },
  },
};
