import { auth } from "~/server/auth";
import { getUserOwnImage } from "../microsoft/microsoftApiService";
import { Role } from "~/types/role";
interface AccountInfoProps {
  name: string;
  email: string;
  role: Role;
  image: string;
  createdAt: string;
}

export default async function getAccountInfo(): Promise<AccountInfoProps> {
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

  return userInfo;
}
