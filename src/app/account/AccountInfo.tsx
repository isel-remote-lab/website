import UserInfo from "../users/[id]/UserInfo";
import { getUserOwnImage } from "~/services/microsoft/microsoftApiService";
import { auth } from "~/server/auth";

export default async function AccountInfo() {
  const session = await auth();
  const user = session!.user;
  const userImage = await getUserOwnImage();

  const userInfo = {
    name: user.name!,
    email: user.email!,
    role: user.role,
    image: userImage!,
    createdAt: user.createdAt,
  };

  return <UserInfo {...userInfo} />;
}
