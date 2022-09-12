import { NextSeo } from 'next-seo'
import React, { useMemo } from 'react'
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table'
import { toast } from 'react-toastify'
import SearchBar from '../../components/inputs/search-bar'
import Pagination from '../../components/tables/pagination'
import Table from '../../components/tables/table'
import useGetAllUsers from '../api/v2/_queries/use-get-all-users'

const columnData = [
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
  {
    id: 'isSubscribed',
    Header: 'isSubscribed',
    accessor: (user) => (user.isSubscribed ? 'true' : 'false'),
    title: 'isSubscribed',
    sortDescFirst: false,
  },
  {
    id: 'isAdmin',
    Header: 'isAdmin',
    accessor: (user) => (user.isAdmin ? 'true' : 'false'),
    title: 'isAdmin',
    sortDescFirst: false,
  },
  {
    id: 'isProcessor',
    Header: 'isProcessor',
    accessor: (user) => (user.isProcessor ? 'true' : 'false'),
    title: 'isProcessor',
    sortDescFirst: false,
  },
  {
    id: 'isPackIssuer',
    Header: 'isPackIssuer',
    accessor: (user) => (user.isPackIssuer ? 'true' : 'false'),
    title: 'isPackIssuer',
    sortDescFirst: false,
  },
  {
    id: 'isSubmitter',
    Header: 'isSubmitter',
    accessor: (user) => (user.isSubmitter ? 'true' : 'false'),
    title: 'isSubmitter',
    sortDescFirst: false,
  },
  {
    id: 'ownedRegularPacks',
    Header: 'Owned Regular Packs',
    accessor: 'ownedRegularPacks',
    title: 'Owned Regular Packs',
    sortDescFirst: false,
  },
  {
    id: 'ownedUltimusPacks',
    Header: 'Owned Ultimus Packs',
    accessor: 'ownedUltimusPacks',
    title: 'Owned Ultimus Packs',
    sortDescFirst: false,
  },
]

const EditUsers = () => {
  const { allUsers, isFetching, error } = useGetAllUsers({})

  const initialState = useMemo(() => {
    return { sortBy: [{ id: '_id' }] }
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
    alert(JSON.stringify(row.values))
  }

  if (isFetching) {
    return null
  }

  if (error) {
    toast.error('Error fetching users')
  }

  return (
    <>
      <NextSeo title="Edit Users" />
      <h1>Edit Users</h1>
      <div>
        <div className="w-full flex justify-between items-center">
          {/* This div left empty on purpose */}
          <div></div>
          <div className="flex flex-row justify-end items-center">
            <SearchBar onChange={updateSearchFilter} />
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

export default EditUsers
