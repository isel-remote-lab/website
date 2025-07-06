import { getGroupById } from "~/server/services/groupsService";

/**
 * This is the page that will be rendered when the user access the URL /lab/:id/settings/groups/:id
 * @param param0 The parameters of the page
 * @returns The page content
 */
export default async function GroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const group = await getGroupById(parseInt(groupId));
  
  return (
    <div>
      <GroupInfo {...group}/>
    </div>
  );
}
