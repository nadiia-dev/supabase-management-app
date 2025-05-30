import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PaginationLinks from "./pagination-links";

interface Props {
  curPage: number;
  total: number;
  onPageChange: (pageNumber: number) => void;
  showPrevNext: boolean;
}

const PaginationControl = ({
  curPage,
  total,
  onPageChange,
  showPrevNext,
}: Props) => {
  return (
    <Pagination>
      <PaginationContent>
        {showPrevNext && total ? (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => onPageChange(curPage - 1)}
              aria-disabled={curPage <= 1}
              tabIndex={curPage <= 1 ? -1 : undefined}
              className={
                curPage <= 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
        ) : null}
        {
          <PaginationLinks
            total={total}
            curPage={curPage}
            onPageChange={onPageChange}
          />
        }
        {showPrevNext && total ? (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => onPageChange(curPage + 1)}
              aria-disabled={curPage >= total}
              tabIndex={curPage >= total ? -1 : undefined}
              className={
                curPage >= total ? "pointer-events-none opacity-50" : undefined
              }
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControl;
