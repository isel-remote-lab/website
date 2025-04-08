import DefaultModal from "~/app/components/defaults/DefaultModal";
import AccountInfo from "~/app/account/AccountInfo";

export default async function AccountModal() {
  return (
    <DefaultModal>
      <AccountInfo />
    </DefaultModal>
  );
}
