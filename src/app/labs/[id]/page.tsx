import LabInfo from "./LabInfo";

/**
 * This is the page that will be rendered when the user access the URL /lab/:id
 * @param param0 The parameters of the page
 * @returns The page content
 */
export default async function LabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LabInfo id={id}/>
}
