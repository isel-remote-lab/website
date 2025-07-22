import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { getUserOwnImage } from "~/server/services/microsoft/microsoftApiService";

/**
 * User avatar component
 * @returns The user avatar component
 */
export default async function UserImage() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  const user = session.user;
  const userImage = await getUserOwnImage() ?? user.image;
  return <Image src={userImage} alt="User Avatar" width="0" height="0" />;
}
