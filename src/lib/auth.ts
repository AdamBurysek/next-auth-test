/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { getUserByEmail } from "@/lib/users";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        const user = await getUserByEmail(email!);
        if (!user) return null;

        const isValid = await bcrypt.compare(password!, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      // Když je nový login, uložíme provider do tokenu
      if (account && user) {
        token.provider = account.provider;
      }
      return token;
    },

    async redirect(params: { url: string; baseUrl: string } & { token?: any }) {
      const token = (params as any).token;
      if (token?.provider === "google") {
        return "/todopage";
      }
      return params.baseUrl;
    },
  },
};

export const auth = (
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) => {
  return getServerSession(...args, authOptions);
};
