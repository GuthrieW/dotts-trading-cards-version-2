import {
  GridList,
  GridListTile,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import React from 'react'
import useStyles from './StaticPackViewer.styles'

const StaticPackViewer = ({ cards }) => {
  const classes = useStyles()
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <GridList
      cols={3}
      cellHeight={smUp ? 300 : 250}
      className={classes.allCards}
    >
      {cards.map((card, index) => {
        return (
          <GridListTile key={index} className={classes.cardContainer}>
            <img className={classes.cardImage} src={card.image_url} />
          </GridListTile>
        )
      })}
    </GridList>
  )
}

export default StaticPackViewer
