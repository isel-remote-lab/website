import { type DefaultSession, type NextAuthConfig } from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import "../../env.js"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"]
    accessToken: string
  }

  interface User {
    role: string
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
    // Store the access token in the user session
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token;
    },

    /**
     * Add custom properties to the session object. This is where you can add the user ID and
     * other properties to the session object. The `session` object is what is returned to the
     * client-side.
     */
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub!,
      }

      if (token.accessToken) {
        try {
          const res = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
            headers: {
              Authorization: `Bearer ${token.accessToken as string}`,
            },
          });
          if (res.ok) {
            const buffer = await res.arrayBuffer();
            const base64 = Buffer.from(buffer).toString("base64");
            session.user.image = `data:image/jpeg;base64,${base64}`;
          } else {
            console.error("Failed to get user profile picture, status:", res.status);
          }
        } catch (error) {
          console.error("Failed to get user profile picture:", error);
        }
      }

      session.accessToken = token.accessToken as string;

      return session
    }
  },
} satisfies NextAuthConfig