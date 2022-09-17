import { PackType, PACK_TYPES } from '../../utils/packs'
import useOpenPack from '../api/v2/_mutations/use-open-pack'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'
import { NextSeo } from 'next-seo'
import { toast } from 'react-toastify'
import Router from 'next/router'
import Spinner from '../../components/spinners/spinner'

const ULTIMUS = 'ultimus'
const REGULAR = 'regular'

const OpenPacks = () => {
  const { currentUser, isFetching: currentUserIsFetching } = useGetCurrentUser(
    {}
  )
  const {
    openPack,
    isSuccess: openPackIsSuccess,
    isLoading: openPackIsLoading,
  } = useOpenPack()

  if (currentUserIsFetching) {
    return <Spinner />
  }

  if (openPackIsSuccess) {
    Router.push('/open-packs/last-pack')
  }

  const handleOnClick = async (packType) => {
    if (openPackIsLoading) {
      toast.warning('Already opening a pack')
      return
    }

    if (packType === ULTIMUS) {
      if (currentUser.ownedUltimusPacks > 0) {
        openPack({ packType: ULTIMUS })
      }
    } else if (packType === REGULAR) {
      if (currentUser.ownedRegularPacks > 0) {
        openPack({ packType: REGULAR })
      }
    }
  }

  const getNumberOfPacks = (packType) => {
    if (packType === ULTIMUS) {
      return currentUser.ownedUltimusPacks
    } else if (packType === REGULAR) {
      return currentUser.ownedRegularPacks
    } else {
      toast.warning('Error getting number of packs')
    }
  }

  return (
    <>
      <NextSeo title="Open Packs" />
      <div className="m-2 flex flex-row justify-center items-center">
        {PACK_TYPES.map((packType: PackType, index) => {
          const { type, name, imageUrl } = packType
          const numberOfPacks = getNumberOfPacks(type)

          return (
            <div
              key={index}
              className="m-8 flex flex-col justify-center items-center w-1/6"
            >
              {numberOfPacks} {name} Packs
              <img
                onClick={() => handleOnClick(type)}
                src={imageUrl}
                className="cursor-pointer transition ease-in-out bg-blue-500 hover:scale-110 duration-300 mt-5"
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default OpenPacks
