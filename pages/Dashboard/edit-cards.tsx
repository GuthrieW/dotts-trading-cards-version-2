import React, { useMemo } from 'react'
import useGetAllCards from '../api/v2/_queries/use-get-all-cards'
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

const columnData = [
  {
    id: '_id',
    Header: '_id',
    accessor: '_id',
    title: '_id',
    sortDescFirst: false,
  },
  {
    id: 'approved',
    Header: 'Approved',
    accessor: (card) => (card.approved ? 'true' : 'false'),
    title: 'Approved',
    sortDescFirst: false,
  },
  {
    id: 'currentRotation',
    Header: 'Current Rotation',
    accessor: (card) => (card.currentRotation ? 'true' : 'false'),
    title: 'Current Rotation',
    sortDescFirst: false,
  },
  {
    id: 'imageUrl',
    Header: 'Image Url',
    accessor: 'imageUrl',
    title: 'Image Url',
    sortDescFirst: false,
  },
  {
    id: 'playerName',
    Header: 'Player Name',
    accessor: 'playerName',
    title: 'Player Name',
    sortDescFirst: false,
  },
  {
    id: 'playerTeam',
    Header: 'Player Team',
    accessor: 'playerTeam',
    title: 'Player Team',
    sortDescFirst: false,
  },
  {
    id: 'rarity',
    Header: 'Rarity',
    accessor: 'rarity',
    title: 'Rarity',
    sortDescFirst: false,
  },
  {
    id: 'submissionDate',
    Header: 'Submission Date',
    accessor: 'submissionDate',
    title: 'Submission Date',
    sortDescFirst: false,
  },
  {
    id: 'submissionUsername',
    Header: 'Submission Username',
    accessor: 'submissionUsername',
    title: 'Submission Username',
    sortDescFirst: false,
  },
]

const EditCards = () => {
  const { allCards, isFetching, error } = useGetAllCards({})

  const initialState = useMemo(() => {
    return { sortBy: [{ id: '_id' }] }
  }, [])

  const columns = useMemo(() => columnData, [])
  const data = useMemo(() => allCards, [allCards])

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
    toast.warning('Error fetching cards')
  }

  return (
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
  )
}

export default EditCards
