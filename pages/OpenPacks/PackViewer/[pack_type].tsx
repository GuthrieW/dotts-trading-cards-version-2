import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import React, { useState } from 'react'
import AnimatedPackViewer from './AnimatedPackViewer'
import useStyles from './PackViewer.styles'
import StaticPackViewer from './StaticPackViewer'

const PackViewer = (props) => {
  const { cards } = props

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
