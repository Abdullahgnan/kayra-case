import NextAuth from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';

const authOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.role = profile?.role || 'user'; 
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.user.role = token.role; 
      return session;
    },
  },
  session: {
    strategy: 'jwt' as const, 
    maxAge: 24 * 60 * 60, 
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };