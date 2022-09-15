import { Formik, Form } from 'formik'
import { NextSeo } from 'next-seo'
import React, { useMemo, useState } from 'react'
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from 'react-table'
import { toast } from 'react-toastify'
import Button from '../../components/buttons/button'
import SubmitButton from '../../components/buttons/submit-button'
import SwitchField from '../../components/fields/switch-field'
import TextField from '../../components/fields/text-field'
import FormWrapper from '../../components/forms/form-wrapper'
import SearchBar from '../../components/inputs/search-bar'
import FormModal from '../../components/modals/form-modal'
import Spinner from '../../components/spinners/spinner'
import Pagination from '../../components/tables/pagination'
import Table from '../../components/tables/table'
import useUpdateUser from '../api/v2/_mutations/use-update-user'
import useGetAllUsers from '../api/v2/_queries/use-get-all-users'

type EditableUserData = {
  _id: string
  isflUsername: string
  email: string
  ownedRegularPacks: number
  ownedUltimusPacks: number
  isSubscribed: boolean
  isAdmin: boolean
  isProcessor: boolean
  isPackIssuer: boolean
  isSubmitter: boolean
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
    id: 'email',
    Header: 'Email',
    accessor: 'email',
    title: 'Email',
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
    id: 'isAdmin',
    Header: 'isAdmin',
    accessor: (user) => (user.isAdmin ? 'true' : 'false'),
    title: 'isAdmin',
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
  const [showModal, setShowModal] = useState(false)
  const [selectedUserData, setSelectedUserData] =
    useState<EditableUserData>(null)

  const { allUsers, isFetching, error } = useGetAllUsers({})
  const { updateUser, isSuccess, isLoading, reset } = useUpdateUser()

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
    const userData: EditableUserData = {
      _id: row?.values?._id ?? '',
      isflUsername: row?.values?.isflUsername ?? '',
      email: row?.values?.email ?? '',
      ownedRegularPacks: row?.values?.ownedRegularPacks ?? 0,
      ownedUltimusPacks: row?.values?.ownedUltimusPacks ?? 0,
      isSubscribed: Boolean(row?.values?.isSubscribed === 'true'),
      isAdmin: Boolean(row?.values?.isAdmin === 'true'),
      isProcessor: Boolean(row?.values?.isProcessor === 'true'),
      isPackIssuer: Boolean(row?.values?.isPackIssuer === 'true'),
      isSubmitter: Boolean(row?.values?.isSubmitter === 'true'),
    }

    setShowModal(true)
    setSelectedUserData(userData)
  }

  if (isFetching) {
    return <Spinner />
  }

  if (isSuccess) {
    toast.success(`${selectedUserData.isflUsername} updated!`)
    setShowModal(false)
    setSelectedUserData(null)
    reset()
  }

  return (
    <>
      <NextSeo title="Edit Users" />
      <h1>Edit Users</h1>
      <div>
        <div className="w-full flex justify-between items-center">
          <div className="flex">
            <SearchBar onChange={updateSearchFilter} disabled={isFetching} />
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
          title={`Edit ${selectedUserData.isflUsername}`}
          toggleModal={() => {
            setShowModal(false)
            setSelectedUserData(null)
          }}
        >
          <FormWrapper>
            <Formik
              initialValues={{
                isflUsername: selectedUserData.isflUsername,
                email: selectedUserData.email,
                ownedRegularPacks: selectedUserData.ownedRegularPacks,
                ownedUltimusPacks: selectedUserData.ownedUltimusPacks,
                isAdmin: selectedUserData.isAdmin,
                isSubscribed: selectedUserData.isSubscribed,
                isProcessor: selectedUserData.isProcessor,
                isPackIssuer: selectedUserData.isPackIssuer,
                isSubmitter: selectedUserData.isSubmitter,
              }}
              onSubmit={async (values) => {
                event.preventDefault()
                if (isLoading) {
                  toast.warning('Already updating user')
                  return
                }

                await updateUser({
                  _id: selectedUserData._id,
                  ownedRegularPacks: values.ownedRegularPacks,
                  ownedUltimusPacks: values.ownedUltimusPacks,
                  isAdmin: values.isAdmin,
                  isSubscribed: values.isSubscribed,
                  isProcessor: values.isProcessor,
                  isPackIssuer: values.isPackIssuer,
                  isSubmitter: values.isSubmitter,
                })
              }}
            >
              {({ handleSubmit, initialValues }) => (
                <Form className="w-full">
                  <div className="w-full flex flex-col justify-start">
                    <div className="grid grid-cols-2 gap-2">
                      <TextField
                        name="isflUsername"
                        label="ISFL Username"
                        type="text"
                        disabled={true}
                      />
                      <TextField
                        name="email"
                        label="Email"
                        type="text"
                        disabled={true}
                      />
                      <TextField
                        name="ownedRegularPacks"
                        label="Owned Regular Packs"
                        type="number"
                        disabled={false}
                      />
                      <TextField
                        name="ownedUltimusPacks"
                        label="Owned Ultimus Packs"
                        type="number"
                        disabled={false}
                      />
                    </div>
                    <div className="flex flex-col justify-start items-start">
                      <SwitchField
                        initialValue={initialValues.isAdmin}
                        name="isAdmin"
                        label="isAdmin"
                        disabled={false}
                      />
                      <SwitchField
                        initialValue={initialValues.isSubscribed}
                        name="isSubscribed"
                        label="isSubscribed"
                        disabled={false}
                      />
                      <SwitchField
                        initialValue={initialValues.isProcessor}
                        name="isProcessor"
                        label="isProcessor"
                        disabled={false}
                      />
                      <SwitchField
                        initialValue={initialValues.isPackIssuer}
                        name="isPackIssuer"
                        label="isPackIssuer"
                        disabled={false}
                      />
                      <SwitchField
                        initialValue={initialValues.isSubmitter}
                        name="isSubmitter"
                        label="isSubmitter"
                        disabled={false}
                      />
                    </div>
                    <div className="flex justify-end">
                      <SubmitButton
                        onClick={() => handleSubmit()}
                        isLoading={isLoading}
                      >
                        Submit
                      </SubmitButton>
                      <Button
                        onClick={() => setShowModal(false)}
                        isLoading={isLoading}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </FormWrapper>
        </FormModal>
      )}
    </>
  )
}

export default EditUsers
