import DefaultPage from "../components/defaults/DefaultPage";
import UserInfoSkeleton from "~/app/users/[id]/UserInfoSkeleton";

export default function AccountInfoModalSkeleton() {
  return (
    <DefaultPage>
      <UserInfoSkeleton />
    </DefaultPage>
  );
}
