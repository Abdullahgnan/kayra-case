import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string | null | unknown; 
    } & DefaultSession['user']; 
    accessToken?: string | null | unknown;
  }


  interface User extends DefaultUser {
    role?: string | null | unknown;

  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    idToken?: string;
    role?: string | null | unknown;
    accessToken?: string | null | unknown;

  }
}