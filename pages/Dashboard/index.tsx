import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/constants'
import axios from 'axios'

import { DOTTS_ACCESS_TOKEN } from '../../utils/constants'
import InfoCard from '../../components/InfoCard/InfoCard'
import { Box, Container } from '@material-ui/core'

function HomePage() {
  const [currentUser, setCurrentUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isProcessor, setIsProcessor] = useState(false)
  const [isSubmitter, setIsSubmitter] = useState(false)
  const [isPackIssuer, setIsPackIssuer] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${API_URL}/api/v1/users/currentUser/`,
        data: {},
      })

      setCurrentUser(user.data.account)
      setIsAdmin(user.data.account.isAdmin)
      setIsProcessor(user.data.account.isProcessor)
      setIsSubmitter(user.data.account.isSubmitter)
      setIsPackIssuer(user.data.account.isPackIssuer)
    }

    fetchData()
  }, [])

  return (
    <Container>
      <h1>Home Page</h1>
      {!currentUser && <h1>Loading...</h1>}
      <Box m={2}>
        {currentUser && (isAdmin || isPackIssuer || isSubmitter) && (
          <InfoCard title="Edit Profile" href="/Dashboard/ProfileEditor" />
        )}
      </Box>
      <Box m={2}>
        {currentUser && (isAdmin || isProcessor) && (
          <InfoCard title="Process Cards" href="/Dashboard/Processor" />
        )}
      </Box>
      <Box m={2}>
        {currentUser && (isAdmin || isSubmitter) && (
          <InfoCard
            title="Submit Cards for Review"
            href="/Dashboard/Submitter"
          />
        )}
      </Box>
      <Box m={2}>
        {currentUser && (isAdmin || isPackIssuer) && (
          <InfoCard title="Issue Packs" href="/Dashboard/PackIssuer" />
        )}
      </Box>
      <Box m={2}>
        {currentUser && (isAdmin || isPackIssuer || isSubmitter) && (
          <InfoCard title="Edit Cards" href="/Dashboard/CardEditor" />
        )}
      </Box>
      <Box m={2}>
        {currentUser && (isAdmin || isPackIssuer || isSubmitter) && (
          <InfoCard title="Edit Users" href="/Dashboard/UserEditor" />
        )}
      </Box>
    </Container>
  )
}

export default HomePage
