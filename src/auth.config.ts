import type { DefaultSession, NextAuthConfig } from "next-auth";
import { PopulatedUser } from "@/app/lib/schema";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    accessToken: string;
    firstName: string;
    lastName: string;
    teamName: string;
    teamId: string;
    teamImage: string;
    type: string;
    team: string;
    language: string;
  }

  interface Session {
    user: PopulatedUser & DefaultSession["user"];
  }
}
export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = !nextUrl.pathname.startsWith("/auth");
      if (isOnDashboard) {
        return isLoggedIn;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session?.user };
      }

      if (user) {
        // User is available during sign-in
        token.id = user.id;
        token.image = user.image;
        token.accessToken = user.accessToken;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.teamName = user.teamName;
        token.teamImage = user.teamImage;
        token.teamId = user.teamId;
        token.type = user.type;
        token.language = user.language;
      }

      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
