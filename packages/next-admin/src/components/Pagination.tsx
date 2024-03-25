import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const MAX_SHOWN_PAGES = 5;
/**
  function that returns an array of pagination pages to display, first page and last pages should always be displayed
  @param {number} pagesTotalNumber - total number of pages
  @param {number} currentPageIndex - current index of the page
  @param {string} separator - separator between pages
  @param {number} maxShownPages - maximum number of pages to display
  @returns {[number | string]} - array of pages to display 
  @example [1, 2, 3, '...', 10] 
  @example [1, 2, 3, 4]
*/
function getShownPagesPagination(
  pagesTotalNumber: number,
  currentPageIndex: number,
  separator: string,
  maxShownPages: number
): Array<number | string> {
  const currentPage = currentPageIndex + 1;

  if (pagesTotalNumber <= maxShownPages) {
    /* if pagesTotalNumber is less than maxShownPages, we display all pages */
    return Array.from({ length: pagesTotalNumber }, (_, i) => i + 1);
  } else {
    /* else we use a separator to display only the pages needed */
    if (currentPage === 1 || currentPage === 2) {
      /* [1, 2, 3, '...', LAST] */
      return [1, 2, 3, separator, pagesTotalNumber];
    } else if (
      currentPage === pagesTotalNumber ||
      currentPage === pagesTotalNumber - 1
    ) {
      /* [1, '...', LAST - 2, LAST - 1, LAST] */
      return [
        1,
        separator,
        pagesTotalNumber - 2,
        pagesTotalNumber - 1,
        pagesTotalNumber,
      ];
    } else {
      /* [1, '...', CURRENT - 1, CURRENT, CURRENT + 1, '...', LAST] */
      return [
        1,
        separator,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        separator,
        pagesTotalNumber,
      ];
    }
  }
}
export interface Props {
  currentPageIndex: number;
  totalPageCount: number;
  onPageChange: (pageIndex: number) => void;
}

export function Pagination({
  currentPageIndex,
  totalPageCount,
  onPageChange,
}: Props) {
  const getCanNextPage = () => {
    return currentPageIndex < totalPageCount - 1;
  };

  const getCanPreviousPage = () => {
    return currentPageIndex > 0;
  };

  return (
    <div className="flex items-center justify-end space-x-2 bg-white">
      <nav
        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        aria-label="Pagination"
      >
        <button
          disabled={!getCanPreviousPage()}
          onClick={() => {
            onPageChange(currentPageIndex - 1);
          }}
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:text-gray-300 disabled:ring-gray-100 disabled:cursor-not-allowed"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        {getShownPagesPagination(
          totalPageCount,
          currentPageIndex,
          "…",
          MAX_SHOWN_PAGES
        ).map((pageNumber, index) => (
          <button
            key={index}
            aria-current="page"
            onClick={() => {
              if (isNaN(Number(pageNumber))) return;
              onPageChange(Number(pageNumber) - 1);
            }}
            className={
              pageNumber === currentPageIndex + 1
                ? "relative z-10 inline-flex items-center bg-nextadmin-primary-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nextadmin-primary-600"
                : "relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            }
          >
            {pageNumber}
          </button>
        ))}
        <button
          disabled={!getCanNextPage()}
          onClick={() => {
            onPageChange(currentPageIndex + 1);
          }}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:text-gray-300 disabled:ring-gray-100 disabled:cursor-not-allowed"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
}
