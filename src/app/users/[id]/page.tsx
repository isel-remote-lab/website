import { getUserById } from "~/server/services/usersService";
import DefaultPage from "~/app/components/defaults/DefaultPage";
import UserInfo from "~/app/users/[id]/UserInfo";
import { getUserImage } from "~/server/services/microsoft/microsoftApiService";
export default async function UserInfoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await getUserById(id);

  user.image = (await getUserImage(user.email)) || "";

  return (
    <DefaultPage>
      <UserInfo {...user} />
    </DefaultPage>
  );
}
