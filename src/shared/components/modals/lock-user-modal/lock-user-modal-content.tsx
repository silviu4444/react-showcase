import { useModal } from "@/shared/hooks/use-modal";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "../../ui/alert-dialog";
import { useTranslation } from "react-i18next";
import useLockUserByEmailMutation from "./use-lock-user-by-email-mutation";
import { useEffect } from "react";

const ChangeUserRoleModalContent = () => {
  const [t] = useTranslation();
  const { mutate, isPending, isSuccess } = useLockUserByEmailMutation();
  const { onClose, data } = useModal();

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{t("are-you-absolutely-sure")}</AlertDialogTitle>
        <AlertDialogDescription>
          {t("lock-user-account-message", { email: data.lockUser!.email })}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => onClose()}>
          {t("cancel")}
        </AlertDialogCancel>
        <AlertDialogAction
          disabled={isPending}
          onClick={() => mutate(data.lockUser!.email)}
        >
          {t("confirm")}
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
};

export default ChangeUserRoleModalContent;
