import React, { useMemo } from 'react'
import useGetAllUsers from '../api/v2/_queries/use-get-all-users'
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table'
import SearchBar from '../../components/inputs/search-bar'
import Pagination from '../../components/tables/pagination'
import Table from '../../components/tables/table'
import { toast } from 'react-toastify'
import { NextSeo } from 'next-seo'

const columnData = []

const IssuePacks = () => {
  const { allUsers, isFetching, error } = useGetAllUsers({})

  const initialState = useMemo(() => {
    return { sortBy: [{ id: 'username' }] }
  }, [])

  const columns = useMemo(() => columnData, [])
  const data = useMemo(() => allUsers, [allUsers])

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

  const handleRowClick = (row) => {
    console.log(row.values)
  }

  if (isFetching) {
    return null
  }

  if (error) {
    toast.warning('Error fetching users')
  }

  return (
    <>
      <NextSeo title="Issue Packs" />
      <h1>Issue Packs</h1>
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

export default IssuePacks
