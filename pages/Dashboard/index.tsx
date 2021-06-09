import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../utils/constants'
import InfoCard from '../../components/InfoCard/InfoCard'
import { Box, Container, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 70,
  },
}))

function HomePage() {
  const [currentUser, setCurrentUser] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/users/currentUser`,
        data: {},
      })

      if (user.data.error) {
      }

      setCurrentUser(user.data.account)
    }

    fetchData()
  }, [])

  return (
    <Container className={classes.root}>
      <h1>Home Page</h1>
      {!currentUser && <h1>Loading...</h1>}
      <Box m={2}>
        {currentUser && (currentUser.isAdmin || currentUser.isProcessor) && (
          <InfoCard title="Process Cards" href="/Dashboard/Processor" />
        )}
      </Box>
      <Box m={2}>
        {currentUser && (currentUser.isAdmin || currentUser.isSubmitter) && (
          <InfoCard
            title="Submit Cards for Review"
            href="/Dashboard/Submitter"
          />
        )}
      </Box>
      <Box m={2}>
        {currentUser && (currentUser.isAdmin || currentUser.isPackIssuer) && (
          <InfoCard title="Issue Packs" href="/Dashboard/PackIssuer" />
        )}
      </Box>
      <Box m={2}>
        {currentUser &&
          (currentUser.isAdmin ||
            currentUser.isSubmitter ||
            currentUser.isProcessor) && (
            <InfoCard title="Edit Cards" href="/Dashboard/CardEditor" />
          )}
      </Box>
      <Box m={2}>
        {currentUser && (currentUser.isAdmin || currentUser.isPackIssuer) && (
          <InfoCard title="Edit Users" href="/Dashboard/UserEditor" />
        )}
      </Box>
      <Box m={2}>
        <InfoCard
          title="How to Purchase"
          body="Start here!"
          href="https://forums.sim-football.com/showthread.php?tid=25272"
        />
      </Box>
      <Box m={2}>
        <InfoCard
          title="Buy Packs"
          body="Build your collection with a new pack of cards! Find the Daily Pack Purchase thread."
          href="https://forums.sim-football.com/forumdisplay.php?fid=366"
        />
      </Box>
      <Box m={2}>
        <InfoCard
          title="Subscribe"
          body="Sign up for automatic pack purchases!"
          href="https://forums.sim-football.com/showthread.php?tid=25283"
        />
      </Box>
    </Container>
  )
}

export default HomePage
