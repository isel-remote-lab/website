import { type DefaultSession, type NextAuthConfig } from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import "../../env.js"
import { type UserResponse } from "~/types/user.js"
import getUserByOAuthId from "~/services/user/getUserByOAuthId.js"
import createUser from "~/services/user/createUser.js"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role: string
      tempRole: string // TODO - Remove
    } & DefaultSession["user"];
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
      // Check if the user is already in the database
      const existingUser = await getUserByOAuthId(user.id!);

      if (existingUser) {
        // If the user is already in the database, return true to allow sign in
        return true
      }

      // If the user is not in the database, create a new user
      const newUser = {
        role: "admin",
        email: user.email!,
        username: user.name!,
        oauthId: user.id!,
      }
      return await createUser(newUser)
    },

    // Store the access token in the user session
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    /**
     * Add custom properties to the session object. This is where you can add the user ID and
     * other properties to the session object. The `session` object is what is returned to the
     * client-side.
     */
    async session({ session, token }) {
      if (token.accessToken && session.user.image === null) {
        // Fetch the user's profile picture from Microsoft Graph API
        // and set it in the session object
        try {
          const res = await fetch(
            "https://graph.microsoft.com/v1.0/me/photo/$value",
            {
              headers: {
                Authorization: `Bearer ${token.accessToken as string}`,
              },
            },
          );
          if (res.ok) {
            const buffer = await res.arrayBuffer();
            const base64 = Buffer.from(buffer).toString("base64");
            session.user.image = `data:image/jpeg;base64,${base64}`;
          } else {
            console.error(
              "Failed to get user profile picture, status:",
              res.status,
            );
          }
        } catch (error) {
          console.error("Failed to get user profile picture:", error);
        }
      }

      // TODO - Fetch the user from the database
      // For now, we will use the mock data
      const user: UserResponse = (await getUserByOAuthId(session.user.id))!;

      session.user.role =
        (user.role ?? session.user.email?.startsWith("a"))
          ? "student"
          : "teacher";

      // TODO - Make the role dynamic
      session.user.tempRole = "teacher";
      return session;
    },
  },
} satisfies NextAuthConfig;
