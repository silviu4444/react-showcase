import { useTranslation } from "react-i18next";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "../ui/pagination";

type PageEvent = {
  page: number;
};

export type PaginationData = {
  count: number;
  page: number;
  pageSize?: number;
};

type CustomPaginationProps = {
  onPageChanged: (event: PageEvent) => void;
  disableNext?: boolean;
} & PaginationData &
  React.ComponentProps<"nav">;

const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  count,
  pageSize = 10,
  onPageChanged,
  ...paginationProps
}) => {
  const lastPage = Math.max(Math.ceil(count / pageSize) - 1, 0);
  const [t] = useTranslation();

  const onNextPage = () => {
    if (page < lastPage) {
      onPageChanged({ page: page + 1 });
    }
  };

  const onPreviousPage = () => {
    if (page > 0) {
      onPageChanged({ page: page - 1 });
    }
  };

  const previousDisabled = page === 0;
  const nextDisabled = page >= lastPage;

  const currentPageLabel = page * pageSize + 1;
  const lastPageLabel = Math.min((page + 1) * pageSize, count);

  return (
    <Pagination {...paginationProps}>
      <PaginationContent>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          {currentPageLabel} - {lastPageLabel} {t("of").toLowerCase()} {count}
        </p>

        <PaginationItem>
          <PaginationPrevious
            onClick={onPreviousPage}
            disabled={previousDisabled}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext onClick={onNextPage} disabled={nextDisabled} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
