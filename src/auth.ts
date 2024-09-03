import CredentialsProvider from 'next-auth/providers/credentials';
import { loginAPI, LoginResponse } from '@/lib/api/authentication';
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User extends LoginResponse {
    error: string;
  }

  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      jwt: string;
      username: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession['user'];
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    jwt: string;
    username: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        token.username = user.user.username;
        token.email = user.user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = { ...session.user, jwt: token.jwt, username: token.username };
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'username and password',
      credentials: {
        identifier: {
          label: 'Username',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          const { identifier, password } = credentials as {
            identifier: string;
            password: string;
          };

          const response = await loginAPI({ identifier, password });

          if (!response?.jwt || !response?.user) throw new Error('Failed to login');

          return response;
        } catch (error) {
          console.log('error', error);
          return null;
        }
      },
    }),
  ],
});
