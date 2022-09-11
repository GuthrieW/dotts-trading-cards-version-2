import React, { useMemo } from 'react'
import useGetUnapprovedCards from '../api/v2/_queries/use-get-unapproved-cards'
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table'
import SearchBar from '../../comps/inputs/search-bar'
import Table from '../../comps/tables/table'
import Pagination from '../../comps/tables/pagination'
import { toast } from 'react-toastify'
import useApproveCards from '../api/v2/_mutations/use-approve-cards'
import { NextSeo } from 'next-seo'

const columnData = []

const ProcessCards = () => {
  const {
    unapprovedCards,
    isFetching: getUnapprovedCardsIsFetching,
    error: getUnapprovedCardsError,
  } = useGetUnapprovedCards({})

  const {
    approveCards,
    isSuccess: approveCardsIsSuccess,
    isLoading: getUnapprovedCardsIsLoading,
    error: approveCardsError,
  } = useApproveCards()

  const initialState = useMemo(() => {
    return { sortBy: [{ id: 'username' }] }
  }, [])

  const columns = useMemo(() => columnData, [])
  const data = useMemo(() => unapprovedCards, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageOptions,
    pageCount,
    canPreviousPage,
    previousPage,
    canNextPage,
    nextPage,
    gotoPage,
    setGlobalFilter,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10, ...initialState },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const gotoLastPage = () => gotoPage(pageCount - 1)
  const updateSearchFilter = (event) => setGlobalFilter(event.target.value)

  const handleRowClick = (row) => {}

  if (getUnapprovedCardsError) {
    toast.warning('Error fetching unapproved cards')
  }

  if (approveCardsError) {
    toast.warning('Error approving cards')
  }

  return (
    <>
      <NextSeo title="Process Cards" />
      <div>
        <div className="flex justify-end items-center">
          <SearchBar onChange={updateSearchFilter} />
        </div>
        <Table
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          rows={page}
          prepareRow={prepareRow}
          onRowClick={handleRowClick}
        />
        <Pagination
          pageOptions={pageOptions}
          pageIndex={pageIndex}
          canNextPage={canNextPage}
          nextPage={nextPage}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          gotoPage={gotoPage}
          gotoLastPage={gotoLastPage}
        />
      </div>
    </>
  )
}

export default ProcessCards
