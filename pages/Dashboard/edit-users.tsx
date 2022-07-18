import React, { useMemo } from 'react'
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table'
import { toast } from 'react-toastify'
import SearchBar from '../../comps/inputs/search-bar'
import Pagination from '../../comps/tables/pagination'
import Table from '../../comps/tables/table'
import useGetAllUsers from '../api/v2/_queries/use-get-all-users'

const columnData = []

const EditUsers = () => {
  const { allUsers, isFetching, error } = useGetAllUsers({})

  const initialState = useMemo(() => {
    return { sortBy: [{ id: 'username' }] }
  }, [])

  const columns = useMemo(() => columnData, [])
  const data = useMemo(() => allUsers, [])

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

  if (error) {
    toast.warning('Error fetching users')
  }

  return (
    <div>
      <div className="flex justify-between items-center">
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
  )
}

export default EditUsers
