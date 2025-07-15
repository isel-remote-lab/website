import { getHardwareById } from "~/server/services/hardwareService";

/**
 * This is the page that will be rendered when the user access the URL /lab/:id/settings/hardware/:id
 * @param param0 The parameters of the page
 * @returns The page content
 */
export default async function HardwarePage({ params }: { params: Promise<{ hardwareId: string }> }) {
  //const { hardwareId } = await params;
  //const hardware = await getHardwareById(parseInt(hardwareId));

  return (
    <div>
      {/* <HardwareInfo {...hardware}/> */}
    </div>
  );
}
