import NextAuth from "next-auth";
import MicrosoftEntraID from "@auth/core/providers/microsoft-entra-id";

export const { handlers } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET
});
