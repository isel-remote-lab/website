import DefaultModal from "~/app/components/defaults/DefaultModal";
import AccountInfo from "~/app/account/AccountInfo";

export default async function AccountModal() {
  const modalInitialSize = {
    initialWidth: 675,
    initialHeight: 625,
  }

  return (
    <DefaultModal modalInitialSize={modalInitialSize}>
      <AccountInfo />
    </DefaultModal>
  );
}
