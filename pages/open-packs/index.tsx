import { PackType, PACK_TYPES } from '../../utils/packs'
import useOpenPack from '../api/v2/mutations/use-open-pack'
import useGetCurrentUser from '../api/v2/queries/use-get-current-user'

const OpenPacks = () => {
  const {
    currentUser,
    isFetching,
    error: getCurrentUserError,
  } = useGetCurrentUser({})
  const { openPack, isSuccess, isLoading, error: openPackError } = useOpenPack()

  const getNumberOfPacks = (packType) => {
    if (packType === 'regular') {
      return currentUser?.ownedRegularPacks
    } else if (packType === 'ultimus') {
      return currentUser?.ownedUltimusPacks
    }

    return 0
  }

  const handleOnClick = async (packType) => {
    openPack(packType)
    // if (currentUser) {
    //   if (packType === 'regular') {
    //     if (currentUser.ownedRegularPacks > 0) {
    //       openPack()
    //       setPackType(packType)
    //     }
    //   } else if (packType === 'ultimus') {
    //     if (currentUser.ownedUltimusPacks > 0) {
    //       setPackType(packType)
    //     }
    //   }
    // }
  }

  return (
    <div>
      {PACK_TYPES.map((packType: PackType) => {
        const { type, name, imageUrl } = packType
        const numberOfPacks = getNumberOfPacks(type)
        return (
          <div className="flex flex-col">
            <div>{name}</div>
            <img
              className=""
              src={imageUrl}
              onClick={() => handleOnClick(type)}
            />
            {numberOfPacks > 1 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 sm:translate-x-1/2 -translate-y-1/2 bg-neutral-800 rounded-full">
                {numberOfPacks}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default OpenPacks
