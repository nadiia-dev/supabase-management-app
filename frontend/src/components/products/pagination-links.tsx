import {
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

interface Props {
  curPage: number;
  total: number;
  onPageChange: (pageNumber: number) => void;
}

function getPaginationRange(curPage: number, total: number) {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= curPage - delta && i <= curPage + delta)
    ) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

const PaginationLinks = ({ total, curPage, onPageChange }: Props) => {
  const pages = getPaginationRange(total, curPage);
  return (
    <>
      {pages.map((page, idx) => (
        <PaginationItem key={idx}>
          {page === "..." ? (
            <PaginationEllipsis />
          ) : (
            <PaginationLink
              href="#"
              onClick={() => onPageChange(Number(page))}
              className={page === curPage ? "active" : ""}
            >
              {page}
            </PaginationLink>
          )}
        </PaginationItem>
      ))}
    </>
  );
};

export default PaginationLinks;
