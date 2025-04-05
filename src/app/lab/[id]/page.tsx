import Title from "antd/es/typography/Title";
import DefaultPage from "~/app/components/pages/DefaultPage";
import { labs } from "~/app/page";

/**
 * This is the page that will be rendered when the user access the URL /lab/:id
 * @param params The parameters of the page
 * @returns The page content
 */
export default async function LabPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const labId = Number(id);

  // TODO: Change this to a database call
  const lab: string = labs[labId - 1] ?? "Laboratório não encontrado";

  return (
    <DefaultPage>
      <Title level={2} style={{ textAlign: "center" }}>
        {lab}
      </Title>
    </DefaultPage>
  );
}
