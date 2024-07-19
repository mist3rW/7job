import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendUser = DefaultSession['user'] & {
  id: string;
  isOAuth: boolean;
  role: string;
  isTwoFactorEnabled: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendUser;
  }
}
