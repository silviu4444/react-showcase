import { usePropertyDetailsByIdModal } from "@/pages/(search)/map/hooks/use-property-details-by-id-modal";
import ErrorBoundary from "@/shared/components/error-boundary/error-boundary";
import { DrawerModal } from "@/shared/components/ui/drawer-modal/drawer-modal";
import DrawerModalFallback from "@/shared/components/ui/drawer-modal/drawer-modal-fallback";
import { useQueryFilters } from "@/shared/providers/query-filters-provider";
import { lazy, Suspense, useState } from "react";

const PropertyDetailsModalContent = lazy(
  () => import("./property-details-modal-content")
);

const PropertyDetailsModal = () => {
  const { isOpen, onClose } = usePropertyDetailsByIdModal();
  const setQueries = useQueryFilters(({ setQueries }) => setQueries);
  const [title, setTitle] = useState("");

  function onCloseModal(open: boolean) {
    if (open) return;
    onClose();
    setQueries({ filters: { pId: "" } });
  }

  return (
    <DrawerModal open={isOpen} onOpenChange={onCloseModal} title={title}>
      <Suspense fallback={<DrawerModalFallback />}>
        <ErrorBoundary>
          <PropertyDetailsModalContent onTitleLoaded={setTitle} />
        </ErrorBoundary>
      </Suspense>
    </DrawerModal>
  );
};

export default PropertyDetailsModal;
