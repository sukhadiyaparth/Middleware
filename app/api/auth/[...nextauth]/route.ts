// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// const options = {
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       authorize: async (credentials:any) => {
//         const user = { id: 1, name: 'user', email: 'user@example.com' };
//         // Implement your own login logic here
//         return Promise.resolve(user);
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }:any) {
//       session.user.id = token.id;
//       return session;
//     },
//     async jwt({ token, user }:any) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//   },
// };

// const handler = (req:any, res:any) => NextAuth(req, res, options);
// export { handler as GET, handler as POST };


import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions, User } from 'next-auth';

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Implement your own login logic here
        // Here is a dummy user object to match the User interface
        const user: User = { id: '1', name: 'user', email: 'user@example.com' };

        // Example login logic
        if (credentials?.email === 'user@example.com' && credentials?.password === 'password') {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }:any) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
