import { type DefaultSession, type NextAuthConfig } from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import "../../env.js";
import { type RoleLetter, roleLetterToRole } from "~/types/role";
import type { UserRequest, UserResponse } from "~/types/user.js";
import { signOut } from "../services/usersService";
import { signIn } from "../services/authService";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface User {
    dbUser?: UserResponse;
    userToken?: string;
  }

  interface Session extends DefaultSession {
    user: {
      oauthUserToken: string;
      userToken: string;
    } & UserResponse &
      DefaultSession["user"];
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
      authorization: {
        params: {
          scope: "openid profile email offline_access User.ReadBasic.All User.Read",
        },
      },
      /*profile(profile) {
        return {
          name: profile.name as string,
          email: profile.email,
          image: profile.picture,
        };
      },
      */
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
    async signIn({ user, profile }) {
      // If API mocking is enabled, simulate a successful sign in
      if (process.env.API_MOCKING === "1") {
        return true;
      }

      try {
        if (!user.email || !user.name) {
          console.error("Missing required user data:", {
            email: user.email,
            name: user.name,
          });
          return false;
        }

        const userRequest: UserRequest = {
          name: user.name,
          email: user.email,
        };
        
        // Sign in the user
        const signInResponse = await signIn(userRequest);
        
        if (signInResponse) {
          // Store the user data in the user object to be used in jwt callback
          user.dbUser = signInResponse.user;
          user.userToken = signInResponse.token;

          return true;
        }
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }

      return false;
    },

    // Store the access token in the user session
    async jwt({ token, account, user }) {
      // If we have an access token, store it in the token
      if (account) {
        token.oauthUserToken = account.access_token;
      }

      // If we have user data from signIn, store it in the token
      if (user) {
        token.user = user.dbUser;
        token.userToken = user.userToken;
        token.picture = user.image;
      }

      console.log(token)
      return token;
    },

    /**
     * Add custom properties to the session object. This is where you can add the user ID and
     * other properties to the session object. The `session` object is what is returned to the
     * client-side.
     */
    async session({ session, token }) {
      const sessionUser = session.user;

      // Add the access token to the session
      sessionUser.oauthUserToken = token.oauthUserToken as string;
      sessionUser.image = token.picture as string;

      console.log(sessionUser.image)

      // Add the user data to the session
      const dbUser = token.user as UserResponse;
      const userToken = token.userToken as string;

      if (dbUser) {
        sessionUser.id = dbUser.id as never;
        sessionUser.role = roleLetterToRole(dbUser.role as unknown as RoleLetter)
        sessionUser.createdAt = new Date(dbUser.createdAt).toLocaleDateString(
          "pt-PT",
        );
        sessionUser.userToken = userToken;
      }

      return session;
    },
  },
  events: {
    /**
     * Sign out the user
     */
    async signOut() {
      try {
        // Sign out the user on the backend
        await signOut();
      } catch (error) {
        console.error("Error during sign out:", error);
      }
    },
  },
} satisfies NextAuthConfig;