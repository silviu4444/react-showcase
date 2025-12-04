import ErrorBoundary from "@/shared/components/error-boundary/error-boundary";
import { DrawerModal } from "@/shared/components/ui/drawer-modal/drawer-modal";
import DrawerModalFallback from "@/shared/components/ui/drawer-modal/drawer-modal-fallback";
import { lazy, Suspense } from "react";
import { useAdvancedFiltersModal } from "../../hooks/use-advanced-filters-modal";

const AdvancedFiltersModalContent = lazy(
  () => import("./advanced-filters-modal-content")
);

const AdvancedFiltersModal = () => {
  const { isOpen, onClose } = useAdvancedFiltersModal();

  return (
    <DrawerModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
      title={"filters"}
    >
      <ErrorBoundary>
        <Suspense fallback={<DrawerModalFallback />}>
          <AdvancedFiltersModalContent />
        </Suspense>
      </ErrorBoundary>
    </DrawerModal>
  );
};

export default AdvancedFiltersModal;
