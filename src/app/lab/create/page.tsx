import DefaultPage from "~/app/components/defaults/DefaultPage";
import CreateLabInfo from "./CreateLabInfo";

export default function CreateLabPage() {
    return (
        <DefaultPage title="Criar laboratório">
            <CreateLabInfo />
        </DefaultPage>
    );
}