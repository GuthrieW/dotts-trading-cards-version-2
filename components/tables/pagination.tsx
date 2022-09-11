import React from 'react'

type PaginationProps = {
  pageOptions: any
  pageIndex: number
  canNextPage: boolean
  nextPage: Function
  canPreviousPage: boolean
  previousPage: Function
  gotoPage: Function
  gotoLastPage: Function
}

const Pagination = ({
  pageOptions,
  pageIndex,
  canNextPage,
  nextPage,
  canPreviousPage,
  previousPage,
  gotoPage,
  gotoLastPage,
}: PaginationProps) => (
  <div className="my-2 flex flex-row justify-center items">
    <button
      className="mx-1 w-8 h-8 hover:bg-gray-300 rounded-md cursor-pointer"
      onClick={() => gotoPage(0)}
      disabled={!canPreviousPage}
    >
      {'<<'}
    </button>
    <button
      className="mx-1 w-8 h-8 hover:bg-gray-300 rounded-md cursor-pointer"
      onClick={() => previousPage()}
      disabled={!canPreviousPage}
    >
      {'<'}
    </button>
    <div className="flex justify-center items-center">
      <span className="mx-1">
        Page {pageIndex + 1} of {pageOptions.length} | Go to page:
      </span>
      <input
        className="mx-1 w-10"
        type="number"
        defaultValue={pageIndex + 1}
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          gotoPage(page)
        }}
      />
    </div>
    <button
      className="mx-1 w-8 h-8 hover:bg-gray-300 rounded-md cursor-pointer"
      onClick={() => nextPage()}
      disabled={!canNextPage}
    >
      {'>'}
    </button>
    <button
      className="mx-1 w-8 h-8 hover:bg-gray-300 rounded-md cursor-pointer"
      onClick={() => gotoLastPage()}
      disabled={!canNextPage}
    >
      {'>>'}
    </button>
  </div>
)

export default Pagination
