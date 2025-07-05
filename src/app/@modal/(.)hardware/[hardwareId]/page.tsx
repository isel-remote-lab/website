import { getGroupById } from "~/server/services/groupsService";
import GroupInfo from "./EditHardwareInfo";

/**
 * This is the page that will be rendered when the user access the URL /lab/:id/settings/groups/:id
 * @param param0 The parameters of the page
 * @returns The page content
 */
export default async function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const group = await getGroupById(parseInt(groupId));

  // TODO: Add is on queue verification and show a message if the user is not allowed to access the lab
  return (
    <div>
      <GroupInfo {...group}/>
    </div>
  );
}
