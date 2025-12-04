import { usePropertyDetailsModal } from "@/pages/(search)/map/hooks/use-property-details-modal";
import ErrorBoundary from "@/shared/components/error-boundary/error-boundary";
import { DrawerModal } from "@/shared/components/ui/drawer-modal/drawer-modal";
import DrawerModalFallback from "@/shared/components/ui/drawer-modal/drawer-modal-fallback";
import { lazy, Suspense, useState } from "react";

const SidePropertyDetailsModalContent = lazy(
  () => import("./side-property-details-modal-content")
);

const SidePropertyDetailsModal = () => {
  const { isOpen, onClose } = usePropertyDetailsModal();
  const [titleFromSelection, setTitleFromSelection] = useState("");
  const onCloseModal = (open: boolean) => {
    if (!open) {
      onClose();
      setTitleFromSelection("");
    }
  };

  return (
    <DrawerModal
      open={isOpen}
      onOpenChange={onCloseModal}
      title={titleFromSelection || "properties"}
    >
      <Suspense fallback={<DrawerModalFallback />}>
        <ErrorBoundary>
          <SidePropertyDetailsModalContent
            onTitleLoaded={setTitleFromSelection}
          />
        </ErrorBoundary>
      </Suspense>
    </DrawerModal>
  );
};

export default SidePropertyDetailsModal;
