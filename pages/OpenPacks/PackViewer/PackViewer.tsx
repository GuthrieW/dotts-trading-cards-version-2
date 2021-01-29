import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import AnimatedPackViewer from './AnimatedPackViewer'
import useStyles from './PackViewer.styles'
import axios from 'axios'
import StaticPackViewer from './StaticPackViewer'
import { API_URL } from '../../../utils/constants'

const PackViewer = () => {
  const [cards, setCards] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        method: 'post',
        url: `${API_URL}/api/v1/users/newestCards`,
        data: {
          userId: localStorage.getItem('dottsUserId'),
        },
      })

      setCards(user.data.newestCards)
    }

    fetchData()
  }, [])

  const [viewStyle, setViewStyle] = useState('animated')
  const classes = useStyles()
  const handleViewStyle = (event, newViewStyle) => {
    setViewStyle(newViewStyle)
  }

  return (
    <div className={classes.packViewerContainer}>
      {viewStyle === 'animated' && <AnimatedPackViewer cards={cards} />}
      {viewStyle === 'static' && <StaticPackViewer cards={cards} />}
      <ToggleButtonGroup
        className={classes.viewStyleGroup}
        value={viewStyle}
        exclusive
        onChange={handleViewStyle}
        aria-label="text formatting"
      >
        <ToggleButton value="animated" aria-label="animated">
          Animated View
        </ToggleButton>
        <ToggleButton value="static" aria-label="static">
          Static View
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default PackViewer
