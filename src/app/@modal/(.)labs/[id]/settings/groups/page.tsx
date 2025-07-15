import LaboratorySettingsModal from "../page";
import ManageGroupsModal from "~/app/@modal/(.)groups/page";

export default async function ManageLabGroupsModal({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div>
      <LaboratorySettingsModal params={params}/>
      <ManageGroupsModal params={params}/>
    </div>
  );
}
