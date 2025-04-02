import DefaultBreadcrumb from "~/app/components/DefaultBreadcrumb";

/**
 * This is the page that will be rendered when the user access the URL /lab/:id
 * @param param0 The parameters of the page
 * @returns The page content
 */
export default async function LabPage({ params }: { params: { id: string } }) {
    const { id } = params

    const current = { title: `Lab ${id}` }

    return (
      <div>
        <DefaultBreadcrumb current={current} />
        <h1>Laboratório: {id}</h1>
      </div>
    );
  }