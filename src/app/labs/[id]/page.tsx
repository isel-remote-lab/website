/**
 * This is the page that will be rendered when the user access the URL /lab/:id
 * @param param0 The parameters of the page
 * @returns The page content
 */
export default async function LabPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  // TODO: Add is on queue verification and show a message if the user is not allowed to access the lab
  return (
    <div>
      <h1>Laboratório: {id}</h1>
    </div>
  );
}
