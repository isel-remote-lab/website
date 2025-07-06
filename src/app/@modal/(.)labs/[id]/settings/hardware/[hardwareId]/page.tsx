import { getHardwareById } from "~/server/services/hardwareService";
import HardwareInfo from "~/app/labs/[id]/settings/hardware/[hardwareId]/EditHardwareInfo";
import DefaultPage from "~/app/components/defaults/DefaultPage";

/**
 * This is the page that will be rendered when the user access the URL /lab/:id/settings/groups/:id
 * @param param0 The parameters of the page
 * @returns The page content
 */
export default async function HardwarePage({ params }: { params: Promise<{ hardwareId: string }> }) {
  const { hardwareId } = await params;
  const hardware = await getHardwareById(parseInt(hardwareId));
  
  return (
    <DefaultPage title="Editar hardware">
      <HardwareInfo hardwareId={parseInt(hardwareId)} initialValues={hardware}/>
    </DefaultPage>
  );
}
