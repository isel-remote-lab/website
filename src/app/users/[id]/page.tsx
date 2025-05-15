import { usersService } from "~/services/usersService";
import DefaultPage from "~/app/components/defaults/DefaultPage";
import UserInfo from "~/app/users/[id]/UserInfo";
import { getUserImage } from "~/services/microsoft/microsoftApiService";
export default async function UserInfoPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // TODO: Fetch the lab data from the API
  const user = await usersService.getUserById(id);

  user.image = (await getUserImage(user.email)) || "";

  return (
    <DefaultPage>
      <UserInfo {...user} />
    </DefaultPage>
  );
}
