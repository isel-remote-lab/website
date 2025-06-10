import DefaultModal from "~/app/components/defaults/DefaultModal";
import AccountInfo from "~/app/account/AccountInfo";

export default async function AccountModal() {
  const modalInitialSize = {
    initialWidth: 650,
    initialHeight: 610,
  }

  return (
    <DefaultModal modalInitialSize={modalInitialSize}>
      <AccountInfo />
    </DefaultModal>
  );
}
