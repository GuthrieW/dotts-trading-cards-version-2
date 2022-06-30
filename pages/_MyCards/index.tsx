import React, { useState } from 'react'
import _ from 'lodash'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import CollectionView from '../../components/CollectionView/CollectionView'
import TrophyRoom from './TrophyRoom'

function MyCardsPage() {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          color="secondary"
          variant="fullWidth"
          centered
        >
          <Tab label="Collection" value={0} />
          <Tab label="Trophy Room" value={1} />
        </Tabs>
      </AppBar>
      {value === 0 && <CollectionView />}
      {value === 1 && <TrophyRoom />}
    </>
  )
}

export default MyCardsPage
