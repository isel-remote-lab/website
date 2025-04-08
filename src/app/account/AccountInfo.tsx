import getAccountInfo from "~/services/session/getAccountInfo";
import UserInfo from "../users/[id]/UserInfo";

export default async function AccountInfo() {
  return <UserInfo {...await getAccountInfo()} />;
}
