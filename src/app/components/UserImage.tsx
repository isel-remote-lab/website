import Image from "next/image";
import { getUserOwnImage } from "~/server/services/microsoft/microsoftApiService";

/**
 * User avatar component
 * @returns The user avatar component
 */
export default async function UserImage() {
  const userImage = await getUserOwnImage();
  return <Image src={userImage ?? ""} alt="User Avatar" width="0" height="0" />;
}
