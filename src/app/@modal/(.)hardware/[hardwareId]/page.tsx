import { getHardwareById } from "~/server/services/hardwareService";
import HardwareInfo from "~/app/labs/[id]/settings/hardware/[hardwareId]/EditHardwareInfo";
import DefaultModal from "~/app/components/defaults/DefaultModal";

/**
 * This is the page that will be rendered when the user access the URL /hardware/:id
 * @param param0 The parameters of the page
 * @returns The page content
 */
export default async function HardwareModal({ params }: { params: Promise<{ hardwareId: string }> }) {
  const { hardwareId } = await params;
  const hardware = await getHardwareById(parseInt(hardwareId));
  
  return (
    <DefaultModal title="Editar hardware">
      <HardwareInfo hardwareId={parseInt(hardwareId)} initialValues={hardware}/>
    </DefaultModal>
  );
}
