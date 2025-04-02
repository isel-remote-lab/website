import NextAuth from "next-auth"
import MicrosoftEntraID from "@auth/core/providers/microsoft-entra-id"
import "../../env.js"
 
export const { handlers } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET
})