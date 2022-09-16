import React, { useMemo } from 'react'
import useGetAllUsers from '../api/v2/_queries/use-get-all-users'
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table'
import { useRouter } from 'next/router'
import SearchBar from '../../components/inputs/search-bar'
import Pagination from '../../components/tables/pagination'
import Table from '../../components/tables/table'
import { NextSeo } from 'next-seo'
import Spinner from '../../components/spinners/spinner'

const columnData: ColumnData[] = [
  {
    id: '_id',
    Header: '_id',
    accessor: '_id',
    title: '_id',
    sortDescFirst: false,
  },
  {
    id: 'isflUsername',
    Header: 'ISFL Username',
    accessor: 'isflUsername',
    title: 'ISFL Username',
    sortDescFirst: false,
  },
  {
    id: 'numberOfOwnedCards',
    Header: 'Owned Cards',
    accessor: 'numberOfOwnedCards',
    title: 'Owned Cards',
    sortDescFirst: false,
  },
]

const Community = () => {
  const router = useRouter()
  const { allUsers, isFetching, error } = useGetAllUsers({})

  const initialState = useMemo(() => {
    return { sortBy: [{ id: 'isflUsername' }] }
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

  if (isFetching) {
    return <Spinner />
  }

  const gotoLastPage = () => gotoPage(pageCount - 1)
  const updateSearchFilter = (event) => setGlobalFilter(event.target.value)

  const handleRowClick = (row) => {
    const user = row.values
    router.push({
      pathname: `/collection/${user._id}`,
    })
  }

  return (
    <>
      <NextSeo title="Community" />
      <h1>Community</h1>
      <div>
        <div className="flex justify-start flex-row max-w-full">
          <div className="flex items-center">
            <SearchBar disabled={isFetching} onChange={updateSearchFilter} />
          </div>
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

export default Community
