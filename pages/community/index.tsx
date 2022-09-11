import React, { useMemo } from 'react'
import useGetAllUsers from '../api/v2/_queries/use-get-all-users'
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table'
import { useRouter } from 'next/router'
import SearchBar from '../../comps/inputs/search-bar'
import Pagination from '../../comps/tables/pagination'
import Table from '../../comps/tables/table'

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

  const gotoLastPage = () => gotoPage(pageCount - 1)
  const updateSearchFilter = (event) => setGlobalFilter(event.target.value)

  const handleRowClick = (row) => {
    const user = row.values
    router.push({
      pathname: `/collection/${user._id}`,
    })
  }

  return (
    <div>
      <div className="flex justify-end flex-row max-w-full">
        <div className="flex justify-center items-center">
          <SearchBar disabled={isFetching} onChange={updateSearchFilter} />
        </div>
      </div>
      {isFetching || error ? null : (
        <>
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
        </>
      )}
    </div>
  )
}

export default Community
