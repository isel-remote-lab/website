import { DefaultSession, type NextAuthConfig } from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import "../../env.js";
import { UserResponse, userService, type UserRequest } from "~/services/userService";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User {
    dbUser?: UserResponse
  }

  interface Session extends DefaultSession {
    user: {
      accessToken: string
    } & UserResponse & DefaultSession["user"]
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
      // If API mocking is enabled, simulate a successful sign in
      if (process.env.API_MOCKING === "enabled") {
        return true
      }

      const userRequest: UserRequest = {
        oauthId: user.id!,
        username: user.name!,
        email: user.email!,
      }

      // Sign in the user
      const dbUser = await userService.signIn(userRequest)
      if (dbUser) {
        // Store the user data in the user object to be used in jwt callback
        user.dbUser = dbUser
        return true
      }

      return false
    },
  
    // Store the access token in the user session
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token

        // Use the user data that was stored in the user object
        if (user?.dbUser) {
          token.user = user.dbUser
        }
      }

      return token
    },

    /**
     * Add custom properties to the session object. This is where you can add the user ID and
     * other properties to the session object. The `session` object is what is returned to the
     * client-side.
     */
    async session({ session, token }) {
      const sessionUser = session.user
      const dbUser = token.user as UserResponse

      // Add the access token to the session
      sessionUser.accessToken = token.accessToken as string

      // Add the user data to the session
      sessionUser.userId = dbUser.userId
      sessionUser.oauthId = dbUser.oauthId
      sessionUser.role = dbUser.role
      sessionUser.username = dbUser.username
      sessionUser.email = dbUser.email
      sessionUser.createdAt = dbUser.createdAt

      return session
    },
  },
  events: {
    /**
     * Sign out the user
     */
    async signOut() {
      // Sign out the user on the backend
      await userService.signOut()
    },
  },
} satisfies NextAuthConfig
