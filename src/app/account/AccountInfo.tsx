import UserInfo from "../users/[id]/UserInfo";
import { getUserOwnImage } from "~/server/services/microsoft/microsoftApiService";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import type { User } from "~/types/user";

export default async function AccountInfo() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  const user = session.user;
  const userImage = await getUserOwnImage();

  const userInfo: User = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: userImage,
    createdAt: user.createdAt,
  };

  return <UserInfo {...userInfo} />;
}
