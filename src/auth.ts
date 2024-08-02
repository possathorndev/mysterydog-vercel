import CredentialsProvider from 'next-auth/providers/credentials';
import { loginAPI } from '@/lib/api/authentication';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'username and password',
      credentials: {
        identifier: {
          label: 'Username *',
          type: 'text',
        },
        password: { label: 'Password *', type: 'password' },
      },
      async authorize(credentials, req): Promise<any> {
        try {
          const response = await loginAPI({
            identifier: credentials!.identifier,
            password: credentials!.password,
          });

          if (!response?.jwt || !response?.user) throw new Error('Failed to login');

          return response;
        } catch (error) {
          console.log('error', error);
          return null;
        }
      },
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
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
        session.user = {
          ...session.user,
          jwt: token.jwt,
          username: token.username,
        };
      }
      return session;
    },
  },
};
