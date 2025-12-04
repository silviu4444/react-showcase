import usePreviewProperties from "@/pages/(search)/map/hooks/use-preview-properties";
import { usePropertyDetailsModal } from "@/pages/(search)/map/hooks/use-property-details-modal";
import DrawerModalContentContainer from "@/shared/components/ui/drawer-modal/drawer-modal-content-container";
import {
  deviceMatcherMap,
  useMediaQuery
} from "@/shared/hooks/use-media-query";
import useScrollRestore from "@/shared/hooks/use-scroll-restore";
import { ErrorDto } from "@/shared/interfaces/dto.interfaces";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import SidePropertyView from "../side-property-details/side-property-view/side-property-view";
import SidePropertyDetailsMobile from "./side-property-details-mobile";

type SidePropertyDetailsModalContentProps = {
  onTitleLoaded: (title: string) => void;
};

const SidePropertyDetailsModalContent: React.FC<
  SidePropertyDetailsModalContentProps
> = ({ onTitleLoaded }) => {
  const { onClose } = usePropertyDetailsModal();

  const {
    page,
    data,
    error,
    isError,
    isFetching,
    isPlaceholderData,
    refetch,
    setPage
  } = usePreviewProperties();
  const [selectionId, setSelectionId] = useState("");
  const isNotPhone = useMediaQuery(deviceMatcherMap.min640);
  const { ref, resetScrollValue } = useScrollRestore();

  useEffect(() => {
    resetScrollValue({
      scrollBackToTop: true,
      scrollBehavior: "smooth"
    });
  }, [page]);

  function onItemClicked(id: string): void {
    setSelectionId(id);
    onTitleLoaded("");
  }

  function onBack() {
    setSelectionId("");
    onTitleLoaded("");
  }

  useEffect(() => {
    isNotPhone && onClose();
  }, [isNotPhone]);

  return (
    <>
      <DrawerModalContentContainer className="mb-4">
        {selectionId ? (
          <SidePropertyDetailsMobile
            propertyId={selectionId}
            onBack={onBack}
            onTitleReady={onTitleLoaded}
          />
        ) : (
          <div className="h-full overflow-y-auto" ref={ref}>
            <SidePropertyView
              currentPage={page}
              data={data}
              error={(error as AxiosError<ErrorDto>)?.response?.data}
              isError={isError}
              isFetching={isFetching}
              isPlaceholderData={isPlaceholderData}
              onItemClicked={onItemClicked}
              refetch={refetch}
              setCurrentPage={setPage}
            />
          </div>
        )}
      </DrawerModalContentContainer>
    </>
  );
};

export default SidePropertyDetailsModalContent;
