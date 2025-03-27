export default async function LabPage({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
      <div>
        <h1>Laboratório: {id}</h1>
      </div>
    );
  }