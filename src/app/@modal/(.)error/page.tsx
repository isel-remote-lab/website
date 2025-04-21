import DefaultModal from "~/app/components/defaults/DefaultModal";

interface ErrorModalProps {
  error: string;
}

export default async function ErrorModal({ error }: ErrorModalProps) {
  return (
    <DefaultModal>
      <div>
        <h1>{error}</h1>
      </div>
    </DefaultModal>
  );
}
