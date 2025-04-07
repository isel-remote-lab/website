import { type DefaultSession, type NextAuthConfig } from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import "../../env.js"
import getUserByOAuthId from "~/services/user/getUserByOAuthId"
import { UserRequest } from "~/types/user.js"
import createUser from "~/services/user/createUser"
import { Client, CustomAuthenticationProvider, Options } from "@microsoft/microsoft-graph-client"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      oauthId: string
      role: string
      tempRole: string // TODO - Remove, to be replaced with a context
    } & DefaultSession["user"]

    accessToken: string
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
      if (process.env.API_MOCKING === "enabled" || await getUserByOAuthId(user.id!)) {
        // If API mocking is enabled, simulate a successful sign in
        // If the user exists, return true to allow sign in
        console.log("User exists in the database")
        return true
      }
      // If the user does not exist, add them to the database

      const newUser: UserRequest = {
        oauthId: user.id!,
        role: "admin",
        username: user.name!,
        email: user.email!,
      }

      const response = createUser(newUser)

      if (!response) {
        console.log("Error creating user")
      }

      return response
    },

    // Store the access token in the user session
    async jwt({ token, account, user }) {
      if (account) {
        console.log(token)
        token.accessToken = account.access_token
        token.oauthId = user.id
      }
      return token;
    },

    /**
     * Add custom properties to the session object. This is where you can add the user ID and
     * other properties to the session object. The `session` object is what is returned to the
     * client-side.
     */
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.user.oauthId = token.oauthId as string

      // Gets the user from the database
      // If API mocking is enabled, simulate a successful response
      const user = (process.env.API_MOCKING === "enabled") ? {role: "a"} : await getUserByOAuthId(session.user.id!)

      const roleMap: { [key: string]: string } = {
        a: "admin",
        t: "teacher",
        s: "student",
      }
      
      session.user.role = roleMap[user!.role] || (session.user.email?.startsWith("a") ? "student" : "teacher")

      session.user.tempRole = "teacher"

      return session
    }
  }
} satisfies NextAuthConfig