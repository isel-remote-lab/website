import getAccountInfo from "~/services/session/getAccountInfo";
import UserInfo from "../user/[id]/UserInfo";

export default async function AccountInfo() {
  return <UserInfo {...await getAccountInfo()} />;
}
