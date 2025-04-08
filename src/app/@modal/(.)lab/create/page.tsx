import DefaultModal from "~/app/components/defaults/DefaultModal";
import CreateLabInfo from "~/app/lab/create/CreateLabInfo";

export default async function CreateLabModal() {
  return (
    <DefaultModal title="Criar laboratório">
      <CreateLabInfo />
    </DefaultModal>
  );
}
