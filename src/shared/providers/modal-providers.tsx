import AuthModal from "@/core/auth/components/auth-modal/auth-modal";
import AddPhoneNumberModal from "../components/modals/add-phone-number-modal/add-phone-number-modal";
import LockUserModal from "../components/modals/lock-user-modal/lock-user-modal";

const ModalProvider = () => {
  return (
    <>
      <AuthModal />
      <AddPhoneNumberModal />
      <LockUserModal />
    </>
  );
};

export default ModalProvider;
