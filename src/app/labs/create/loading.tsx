import DefaultPage from "~/app/components/defaults/DefaultPage";
import CreateLabInfoSkeleton from "./CreateLabInfoSkeleton";

export default function CreateLabPage() {
  return (
    <DefaultPage title="Criar laboratório">
      <CreateLabInfoSkeleton />
    </DefaultPage>
  );
}
