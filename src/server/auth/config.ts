import { type NextAuthConfig } from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import "../../env.js";
import { userService, type UserRequest } from "~/services/userService";

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
    async signIn({ user, account }) {
      // If API mocking is enabled, simulate a successful sign in
      if (process.env.API_MOCKING === "enabled") {
        return true;
      }

      const userRequest: UserRequest = {
        oauthId: user.id!,
        username: user.name!,
        email: user.email!,
        accessToken: account!.access_token!,
      }

      // Sign in the user
      userService.signIn(userRequest).then(() => {
        return true;
      })

      return false;
    },
  },
} satisfies NextAuthConfig;
