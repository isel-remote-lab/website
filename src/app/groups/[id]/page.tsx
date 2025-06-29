import { getGroupById } from "~/server/services/groupsService";
import GroupInfo from "~/app/labs/[id]/settings/groups/[groupId]/ManageGroupInfo";
import { GroupFields } from "~/types/group";
import DefaultPage from "~/app/components/defaults/DefaultPage";

/**
 * This is the modal that will be rendered when the user access the URL /groups/:id
 * @param param0 The parameters of the modal
 * @returns The modal content
 */
export default async function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const group = await getGroupById(parseInt(id));

  return (
    <DefaultPage title={`Grupo: ${group[GroupFields.NAME]}`}>
      <GroupInfo {...group}/>
    </DefaultPage>
  );
}
