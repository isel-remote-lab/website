import { getLabById } from "~/server/services/labsService";
import LaboratorySettingsModal from "../page";
import ManageHardwareModal from "./ManageHardwareModal";

export default async function ManageLabHardwareModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const initialValues = await getLabById(Number(id));

  return (
    <div>
      <LaboratorySettingsModal params={params}/>
      <ManageHardwareModal lab={initialValues}/>
    </div>
  );
}
