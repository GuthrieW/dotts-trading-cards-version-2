import React, { useMemo, useState } from 'react'
import useGetAllCards from '../api/v2/_queries/use-get-all-cards'
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
import { NextSeo } from 'next-seo'
import { format } from 'date-fns'
import FormModal from '../../components/modals/form-modal'
import FormWrapper from '../../components/forms/form-wrapper'
import { Formik, Form } from 'formik'
import useUpdateCard from '../api/v2/_mutations/use-update-card'
import TextField from '../../components/fields/text-field'
import SelectField from '../../components/fields/select-field'
import SwitchField from '../../components/fields/switch-field'
import { RARITIES, TEAMS } from '../../utils/constants'
import SubmitButton from '../../components/buttons/submit-button'
import Button from '../../components/buttons/button'
import Spinner from '../../components/spinners/spinner'
import Router from 'next/router'

type EditableCardData = {
  _id: string
  approved: boolean
  currentRotation: boolean
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

const EditCards = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedCardData, setSelectedCardData] =
    useState<EditableCardData>(null)
  const [cardImage, setCardImage] = useState<string>('')

  const { allCards, isFetching: allCardsIsFetching } = useGetAllCards({})
  const { updateCard, isSuccess, isLoading, reset } = useUpdateCard()

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

  if (allCardsIsFetching) {
    console.log('spinning')
    return <Spinner />
  }

  if (isSuccess) {
    toast.success(`${selectedCardData.playerName} card updated!`)
    setShowModal(false)
    setSelectedCardData(null)
    reset()
  }

  const gotoLastPage = () => gotoPage(pageCount - 1)
  const updateSearchFilter = (event) => setGlobalFilter(event.target.value)

  const handleRowClick = (row) => {
    setCardImage(row?.values?.imageUrl ?? '')
    const cardData: EditableCardData = {
      _id: row?.values?._id ?? '',
      approved: row?.values?.approved === 'true' ?? false,
      currentRotation: row?.values?.currentRotation === 'true' ?? false,
      imageUrl: row?.values?.imageUrl ?? '',
      playerName: row?.values?.playerName ?? '',
      playerTeam: row?.values?.playerTeam ?? '',
      rarity: row?.values?.rarity ?? '',
    }

    setShowModal(true)
    setSelectedCardData(cardData)
  }

  console.log('rendering the page')

  return (
    <>
      <NextSeo title="Edit Cards" />
      <h1>Edit Cards</h1>
      <div>
        <div className="w-full flex justify-start items-center">
          <div className="flex items-center">
            <SearchBar
              onChange={updateSearchFilter}
              disabled={allCardsIsFetching}
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
          title={`Edit ${selectedCardData.playerName}`}
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
                  approved: selectedCardData.approved,
                  currentRotation: selectedCardData.currentRotation,
                  imageUrl: selectedCardData.imageUrl,
                  playerName: selectedCardData.playerName,
                  playerTeam: selectedCardData.playerTeam,
                  rarity: selectedCardData.rarity,
                }}
                onSubmit={async (values) => {
                  event.preventDefault()
                  if (isLoading) {
                    toast.warning('Already updating card')
                    return
                  }

                  await updateCard({
                    _id: selectedCardData._id,
                    approved: values.approved,
                    currentRotation: values.currentRotation,
                    imageUrl: values.imageUrl,
                    playerName: values.playerName,
                    playerTeam: values.playerTeam,
                    rarity: values.rarity,
                  })
                }}
              >
                {({ handleSubmit, initialValues }) => (
                  <Form
                    className="w-full"
                    onChange={(event) => {
                      // @ts-ignore
                      const { name, value } = event.target

                      if (name === 'imageUrl') {
                        setCardImage(value)
                      }
                    }}
                  >
                    <TextField
                      name="playerName"
                      label="Player Name"
                      type="text"
                      disabled={false}
                    />
                    <TextField
                      name="imageUrl"
                      label="Image URL"
                      type="text"
                      disabled={false}
                    />
                    <SelectField
                      name="playerTeam"
                      label="Player Team"
                      options={TEAMS.map((team) => {
                        return {
                          label: `${team.CITY_NAME} ${team.TEAM_NAME}`,
                          value: `${team.CITY_NAME} ${team.TEAM_NAME}`,
                        }
                      })}
                      disabled={false}
                    />
                    <SelectField
                      name="rarity"
                      label="Rarity"
                      options={RARITIES}
                      disabled={false}
                    />
                    <SwitchField
                      // @ts-ignore
                      initialValue={initialValues.approved}
                      name="approved"
                      label="Approved"
                      disabled={false}
                    />
                    <SwitchField
                      // @ts-ignore
                      initialValue={initialValues.currentRotation}
                      name="currentRotation"
                      label="Current Rotation"
                      disabled={false}
                    />
                    <div>
                      <SubmitButton
                        onClick={() => handleSubmit()}
                        isLoading={isLoading}
                      >
                        Submit
                      </SubmitButton>
                      <Button
                        isLoading={isLoading}
                        onClick={() => {
                          setShowModal(false)
                          setSelectedCardData(null)
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </FormWrapper>

            <img src={cardImage} />
          </div>
        </FormModal>
      )}
    </>
  )
}

export default EditCards
