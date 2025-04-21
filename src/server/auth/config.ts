import { type DefaultSession, type NextAuthConfig } from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import "../../env.js";
import getUserByOAuthId from "~/services/user/getUserByOAuthId";
import { type UserRequest, type UserResponse } from "~/types/user.js";
import createUser from "~/services/user/createUser";
import { Role, roleLetterToRole } from "~/types/role";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      accessToken: string
      dbUser: UserResponse
      role: Role
    } & DefaultSession["user"]
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  callbacks: {
    async signIn({ user }) {
      // Check if the user exists in the database
      if (
        process.env.API_MOCKING === "enabled" ||
        (await getUserByOAuthId(user.id!))
      ) {
        // If API mocking is enabled, simulate a successful sign in
        // If the user exists, return true to allow sign in
        return true;
      }
      // If the user does not exist, add them to the database

      // Automatically assign the role based on the email address (ISEL only)
      const roleLetter = /^a\d{5}@alunos\.isel\.pt$/.test(user.email!)
        ? "S"
        : "T";

      const newUser: UserRequest = {
        oauthId: user.id!,
        role: roleLetter,
        username: user.name!,
        email: user.email!,
      };

      await createUser(newUser);

      return true;
    },

    // Store the access token in the user session
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token

        const dbUser = await getUserByOAuthId(user.id!)
        token.dbUser = dbUser

        token.role = roleLetterToRole(dbUser!.role)
      }
      return token;
    },

    /**
     * Add custom properties to the session object. This is where you can add the user ID and
     * other properties to the session object. The `session` object is what is returned to the
     * client-side.
     */
    async session({ session, token }) {
      const user = session.user;

      user.accessToken = token.accessToken as string;
      user.dbUser = token.dbUser as UserResponse;
      user.role = token.role as Role

      return session;
    },
  },
} satisfies NextAuthConfig;
