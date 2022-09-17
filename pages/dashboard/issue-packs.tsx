import React, { useMemo, useState } from 'react'
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
import { NextSeo } from 'next-seo'
import Spinner from '../../components/spinners/spinner'
import Button from '../../components/buttons/button'
import useIssueSubsciberPacks from '../api/v2/_mutations/use-subscriber-issue-packs'
import useIssueSinglePack from '../api/v2/_mutations/use-issue-single-pack'
import { Packs } from '../../utils/packs'
import FormModal from '../../components/modals/form-modal'
import FormWrapper from '../../components/forms/form-wrapper'
import { toast } from 'react-toastify'

type EditableUserData = {
  _id: string
  isflUsername: string
}

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

const IssuePacks = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<EditableUserData>(null)

  const { allUsers, isFetching } = useGetAllUsers({})
  const {
    issueSubscriberPacks,
    isSuccess: subscriberPacksIsSuccess,
    isLoading: subscriberPacksIsLoading,
    reset: subscriberPacksReset,
  } = useIssueSubsciberPacks()
  const {
    issueSinglePack,
    isSuccess: singlePackIsSuccess,
    isLoading: singlePackIsLoading,
    reset: singlePackReset,
  } = useIssueSinglePack()

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
    const userDate = {
      _id: row.values._id,
      isflUsername: row.values.isflUsername,
    }

    setShowModal(true)
    setSelectedUser(userDate)
  }

  const handleSubmit = async (packType: string) => {
    await issueSinglePack({
      _id: selectedUser._id,
      packType,
    })
  }

  if (isFetching) {
    return <Spinner />
  }

  if (subscriberPacksIsSuccess) {
    setShowModal(false)
    setSelectedUser(null)
    subscriberPacksReset()
  }

  if (singlePackIsSuccess) {
    setShowModal(false)
    setSelectedUser(null)
    singlePackReset()
  }

  return (
    <>
      <NextSeo title="Issue Packs" />
      <h1>Issue Packs</h1>
      <div>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center">
            <SearchBar onChange={updateSearchFilter} disabled={isFetching} />
            <Button
              onClick={() =>
                issueSubscriberPacks({ packType: Packs.Type.Regular })
              }
              isLoading={subscriberPacksIsLoading}
            >
              Issue Subs Base Packs
            </Button>
            <Button
              onClick={() =>
                issueSubscriberPacks({ packType: Packs.Type.Ultimus })
              }
              isLoading={subscriberPacksIsLoading}
            >
              Issue Subs Ultimus Packs
            </Button>
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
      {showModal && (
        <FormModal
          title={`Issue Pack to ${selectedUser.isflUsername}`}
          toggleModal={() => {
            setShowModal(false)
            setSelectedUser(null)
          }}
        >
          <FormWrapper>
            <Button
              onClick={() => handleSubmit(Packs.Type.Regular)}
              isLoading={
                isFetching || subscriberPacksIsLoading || singlePackIsLoading
              }
            >
              Issue Base Pack
            </Button>
            <Button
              onClick={() => handleSubmit(Packs.Type.Ultimus)}
              isLoading={
                isFetching || subscriberPacksIsLoading || singlePackIsLoading
              }
            >
              Issue Ultimus Pack
            </Button>
            <Button
              onClick={() => {
                setShowModal(false)
                setSelectedUser(null)
              }}
              isLoading={
                isFetching || subscriberPacksIsLoading || singlePackIsLoading
              }
            >
              Cancel
            </Button>
          </FormWrapper>
        </FormModal>
      )}
    </>
  )
}

export default IssuePacks
