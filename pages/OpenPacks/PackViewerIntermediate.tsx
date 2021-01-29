import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL } from '../../utils/constants'
import PackViewer from './PackViewer/[pack_type]'

const PackViewerIntermediate = () => {
  const router = useRouter()
  const { packType } = router.query

  const [openedCards, setOpenedCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      console.log('packType', packType)
      const user = await axios({
        method: 'post',
        url: `${API_URL}/api/v1/users/singleUser/dottsUserId`,
        data: {
          userId: localStorage.getItem('dottsUserId'),
        },
      })
      console.log('user', user)

      let packOpenUrl
      if (packType === 'regular') {
        packOpenUrl = `${API_URL}/api/v1/packs/open/regular`
      } else if (packType === 'ultimus') {
        packOpenUrl = `${API_URL}/api/v1/packs/open/ultimus`
      } else {
        packOpenUrl = ''
      }

      console.log('packOpenUrl', packOpenUrl)

      const openedPack = await axios({
        method: 'post',
        url: packOpenUrl,
        data: {
          providerAccountId: user.data.providerAccountId,
        },
      })
      console.log('openedPack', openedPack)

      setOpenedCards(openedPack.data.pulledCards)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && openedCards.length === 0 && (
        <h1>
          There was an error with your opening. Please contact
          caltroit_red_flames via discord.
        </h1>
      )}
      {!isLoading && openedCards.length > 0 && (
        <PackViewer cards={openedCards} />
      )}
    </>
  )
}

export default PackViewerIntermediate
