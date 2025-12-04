import { DrawerModal } from "@/shared/components/ui/drawer-modal/drawer-modal";
import { useModal } from "@/shared/hooks/use-modal";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../../error-boundary/error-boundary";
import DrawerModalFallback from "../../ui/drawer-modal/drawer-modal-fallback";

const AddPhoneNumberModalContent = lazy(
  () => import("./add-phone-number-modal-content")
);

const AddPhoneNumberModal = () => {
  const { isOpen, onClose, type } = useModal();

  if (isOpen && type !== "add-phone-number") {
    return;
  }

  return (
    <DrawerModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title="add-phone-number"
    >
      <Suspense fallback={<DrawerModalFallback />}>
        <ErrorBoundary>
          <AddPhoneNumberModalContent />
        </ErrorBoundary>
      </Suspense>
    </DrawerModal>
  );
};

export default AddPhoneNumberModal;
