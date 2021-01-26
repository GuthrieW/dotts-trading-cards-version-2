import {
  Grid,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'
import useStyles from './PlayerCard.styles'

const PlayerCard = ({
  card,
  currentCard,
  handleOpenCard,
  handleCloseCard,
  open,
}) => {
  const classes = useStyles()
  return (
    <Grid key={card.player_name} item xs={6} md={4} lg={3}>
      <Box onClick={() => handleOpenCard(card)}>
        <img className={classes.cardContainer} src={card.image_url} />
      </Box>
      <Dialog
        open={open}
        onClose={handleCloseCard}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {currentCard && (
            <img
              className={classes.cardContainer}
              src={currentCard.image_url}
            />
          )}
        </DialogContent>
        {currentCard && (
          <DialogTitle id="alert-dialog-title">
            {currentCard.player_name} - {currentCard.rarity}
          </DialogTitle>
        )}
      </Dialog>
    </Grid>
  )
}

export default PlayerCard
