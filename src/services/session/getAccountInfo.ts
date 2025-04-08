import { auth } from "~/server/auth";
import getUserImage from "../microsoft/getUserImage";

export interface AccountInfoProps {
  name: string;
  email: string;
  role: string;
  image: string;
  joinedAt: string;
}

export default async function getAccountInfo(): Promise<AccountInfoProps> {
  const session = await auth();
  const user = session!.user;
  const userImage = await getUserImage();

  const userInfo = {
    name: user.name!,
    email: user.email!,
    role: user.role,
    image: userImage ?? user.image!,
  };

  // TODO: get the joinedAt date from the database
  const joinedAt = new Date("2025-07-04T20:42:00Z").toString();

  return {
    ...userInfo,
    joinedAt,
  };
}
