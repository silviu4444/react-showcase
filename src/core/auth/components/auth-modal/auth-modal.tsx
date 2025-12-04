import ErrorBoundary from "@/shared/components/error-boundary/error-boundary";
import { DrawerModal } from "@/shared/components/ui/drawer-modal/drawer-modal";
import DrawerModalFallback from "@/shared/components/ui/drawer-modal/drawer-modal-fallback";
import { lazy, Suspense } from "react";
import { useAuthModal } from "../../hooks/use-auth-modal";

const AuthModalContent = lazy(() => import("./auth-modal-content"));

const AuthModal = () => {
  const { isOpen, onClose } = useAuthModal();

  return (
    <DrawerModal open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Suspense fallback={<DrawerModalFallback />}>
        <ErrorBoundary>
          <AuthModalContent />
        </ErrorBoundary>
      </Suspense>
    </DrawerModal>
  );
};

export default AuthModal;
