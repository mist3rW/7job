import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import Credentials from 'next-auth/providers/credentials';
import { signinSchema } from '@/types/auth-schema';
import bcrypt from 'bcryptjs';
import FacebookProvider from 'next-auth/providers/facebook';
import DiscordProvider from 'next-auth/providers/discord';
import LineProvider from 'next-auth/providers/line';
import prisma from './db';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await prisma.user.findFirst({
        where: {
          id: token.sub,
        },
      });
      if (!existingUser) return token;

      const existingAccount = await prisma.account.findFirst({
        where: {
          userId: existingUser.id,
        },
      });

      token.isOAuth = !!existingAccount;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
    async session({ session, token }) {
      if (session && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token.role) {
        session.user.role = token.role as string;
      }
      if (session.user) {
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID!,
      clientSecret: process.env.LINE_CLIENT_SECRET!,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validateFields = signinSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await prisma.user.findFirst({
            where: {
              email,
            },
          });
          if (!user || !user.password) return null;

          const comparedPassword = await bcrypt.compare(
            password,
            user.password
          );
          if (comparedPassword) return user;
        }
        return null;
      },
    }),
  ],
});
