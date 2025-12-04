import {
  CardContent,
  CardHeader,
  CardTitle
} from "@/shared/components/ui/card";
import useScrollRestore from "@/shared/hooks/use-scroll-restore";
import { ErrorDto } from "@/shared/interfaces/dto.interfaces";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQueryFilters } from "../../../../../../shared/providers/query-filters-provider";
import usePreviewProperties from "../../../hooks/use-preview-properties";
import PropertyDetails from "./property-details/property-details";
import SidePropertyView from "./side-property-view/side-property-view";

const SidePropertyDetails = () => {
  const [t] = useTranslation();
  const selectionId = useQueryFilters(({ queryFilters }) => queryFilters.pId);

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
  const { ref, resetScrollValue } = useScrollRestore();
  useEffect(() => {
    resetScrollValue({
      scrollBackToTop: true,
      scrollBehavior: "smooth"
    });
  }, [page]);

  if (selectionId) {
    return <PropertyDetails propertyId={selectionId} />;
  }

  return (
    <>
      <CardHeader>
        <CardTitle>{t("properties")}</CardTitle>
      </CardHeader>
      <CardContent
        className="h-[calc(100dvh-206px)] overflow-y-auto pb-4"
        ref={ref}
      >
        <SidePropertyView
          currentPage={page}
          data={data}
          error={(error as AxiosError<ErrorDto>)?.response?.data}
          isError={isError}
          isFetching={isFetching}
          isPlaceholderData={isPlaceholderData}
          refetch={refetch}
          setCurrentPage={setPage}
        />
      </CardContent>
    </>
  );
};

export default SidePropertyDetails;
