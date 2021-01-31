import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import { API_URL } from '../../utils/constants'
import { DOTTS_ACCESS_TOKEN } from '../../utils/constants'

const PackViewerIntermediate = (props) => {
  const { packType } = props
  // const router = useRouter()
  // const { packType } = router.query

  const [openedCards, setOpenedCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${API_URL}/api/v1/users/singleUser/dottsUserId`,
        data: {
          accessToken: localStorage.getItem('dottsUserId'),
        },
      })

      let packOpenUrl
      if (packType === 'regular') {
        packOpenUrl = `${API_URL}/api/v1/packs/open/regular`
      } else if (packType === 'ultimus') {
        packOpenUrl = `${API_URL}/api/v1/packs/open/ultimus`
      } else {
        packOpenUrl = ''
      }

      const openedPack = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: packOpenUrl,
        data: {
          providerAccountId: user.data.providerAccountId,
        },
      })

      setOpenedCards(openedPack.data.pulledCards)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const redirectToPackViewer = () => {
    Router.push({
      pathname: `/OpenPacks/PackViewer/PackViewer`,
    })
  }

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && openedCards.length === 0 && (
        <h1>
          There was an error with your opening. Please contact
          caltroit_red_flames via discord.
        </h1>
      )}
      {!isLoading && openedCards.length > 0 && redirectToPackViewer()}
    </>
  )
}

export default PackViewerIntermediate
