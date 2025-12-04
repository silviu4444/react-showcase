import { useModal } from "@/shared/hooks/use-modal";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../error-boundary/error-boundary";
import { AlertDialog, AlertDialogContent } from "../../ui/alert-dialog";
import DrawerModalFallback from "../../ui/drawer-modal/drawer-modal-fallback";

const LockUserModalContent = lazy(() => import("./lock-user-modal-content"));

const LockUserModal = () => {
  const { isOpen, type } = useModal();

  if (isOpen && type !== "lock-user") {
    return;
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <Suspense fallback={<DrawerModalFallback />}>
          <ErrorBoundary>
            <LockUserModalContent />
          </ErrorBoundary>
        </Suspense>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LockUserModal;
