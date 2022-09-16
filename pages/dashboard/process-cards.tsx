import React, { useMemo, useState } from 'react'
import useGetUnapprovedCards from '../api/v2/_queries/use-get-unapproved-cards'
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table'
import SearchBar from '../../components/inputs/search-bar'
import Table from '../../components/tables/table'
import Pagination from '../../components/tables/pagination'
import { toast } from 'react-toastify'
import useApproveCard from '../api/v2/_mutations/use-approve-card'
import { NextSeo } from 'next-seo'
import useDeleteCard from '../api/v2/_mutations/use-delete-card'
import { format } from 'date-fns'
import FormModal from '../../components/modals/form-modal'
import FormWrapper from '../../components/forms/form-wrapper'
import { Form, Formik } from 'formik'
import TextField from '../../components/fields/text-field'
import Button from '../../components/buttons/button'
import Spinner from '../../components/spinners/spinner'

type EditableCardData = {
  _id: string
  imageUrl: string
  playerName: string
  playerTeam: string
  rarity: string
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
    accessor: (card) =>
      format(new Date(card.submissionDate), 'yyyy-MM-dd HH:mm:ss'),
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
const ProcessCards = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedCardData, setSelectedCardData] =
    useState<EditableCardData>(null)

  const {
    unapprovedCards,
    isFetching: getUnapprovedCardsIsFetching,
    error: getUnapprovedCardsError,
  } = useGetUnapprovedCards({})

  const {
    approveCard,
    isSuccess: approveCardsIsSuccess,
    isLoading: approveCardIsLoading,
    error: approveCardError,
    reset: approveCardReset,
  } = useApproveCard()

  const {
    deleteCard,
    isSuccess: deleteCardIsSuccess,
    isLoading: deleteCardIsLoading,
    error: deleteCardError,
    reset: deleteCardReset,
  } = useDeleteCard()

  const initialState = useMemo(() => {
    return { sortBy: [{ id: '_id' }] }
  }, [])

  const columns = useMemo(() => columnData, [])
  const data = useMemo(() => unapprovedCards, [unapprovedCards])

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
    const cardData: EditableCardData = {
      _id: row?.values?._id ?? '',
      imageUrl: row?.values?.imageUrl ?? '',
      playerName: row?.values?.playerName ?? '',
      playerTeam: row?.values?.playerTeam ?? '',
      rarity: row?.values?.rarity ?? '',
    }

    setShowModal(true)
    setSelectedCardData(cardData)
  }

  if (getUnapprovedCardsIsFetching) {
    return <Spinner />
  }

  if (approveCardsIsSuccess) {
    toast.success('Successfuly approved card')
    setShowModal(false)
    setSelectedCardData(null)
    approveCardReset()
  }

  if (deleteCardIsSuccess) {
    toast.success('Successfuly deleted card')
    setShowModal(false)
    setSelectedCardData(null)
    deleteCardReset()
  }

  return (
    <>
      <NextSeo title="Process Cards" />
      <h1>Process Cards</h1>
      <div>
        <div className="w-full flex justify-start items-center">
          <div className="flex items-center">
            <SearchBar
              onChange={updateSearchFilter}
              disabled={getUnapprovedCardsIsFetching}
            />
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
          title={`Process ${selectedCardData.playerName}`}
          toggleModal={() => {
            setShowModal(false)
            setSelectedCardData(null)
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <FormWrapper>
              <Formik
                initialValues={{
                  _id: selectedCardData._id,
                  imageUrl: selectedCardData.imageUrl,
                  playerName: selectedCardData.playerName,
                  playerTeam: selectedCardData.playerTeam,
                  rarity: selectedCardData.rarity,
                }}
                onSubmit={async (values) => {}}
              >
                {({ handleSubmit, initialValues }) => (
                  <Form className="w-full">
                    <TextField
                      name="playerName"
                      label="Player Name"
                      type="text"
                      disabled={true}
                    />
                    <TextField
                      name="imageUrl"
                      label="Image URL"
                      type="text"
                      disabled={true}
                    />
                    <TextField
                      name="playerTeam"
                      label="Player Team"
                      type="text"
                      disabled={true}
                    />
                    <TextField
                      name="rarity"
                      label="Rarity"
                      type="text"
                      disabled={true}
                    />
                  </Form>
                )}
              </Formik>
            </FormWrapper>
            <img src={selectedCardData.imageUrl} />
          </div>
          <div className="flex justify-end items-center">
            <Button
              onClick={() => {
                if (approveCardIsLoading || deleteCardIsLoading) {
                  toast.warning('Already approving card')
                }
                approveCard({ _id: selectedCardData._id })
              }}
              isLoading={approveCardIsLoading || deleteCardIsLoading}
              buttonType="confirm"
            >
              Approve Card
            </Button>
            <Button
              isLoading={approveCardIsLoading || deleteCardIsLoading}
              onClick={() => {
                if (approveCardIsLoading || deleteCardIsLoading) {
                  toast.warning('Already deleting card')
                }
                deleteCard({ _id: selectedCardData._id })
              }}
              buttonType="warning"
            >
              Delete Card
            </Button>
            <Button
              isLoading={approveCardIsLoading || deleteCardIsLoading}
              onClick={() => {
                setShowModal(false)
                setSelectedCardData(null)
              }}
            >
              Cancel
            </Button>
          </div>
        </FormModal>
      )}
    </>
  )
}

export default ProcessCards
