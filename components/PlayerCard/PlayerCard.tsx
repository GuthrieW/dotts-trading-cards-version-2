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
  className,
  currentCard,
  handleOpenCard,
  handleCloseCard,
  open,
}) => {
  const classes = useStyles()
  return (
    <Grid key={card.playerName} item xs={6} md={4} lg={3} className={className}>
      <Box onClick={() => handleOpenCard(card)}>
        {/* <img className={classes.cardContainer} src={card.imageUrl} /> */}
        <img
          className={classes.cardContainer}
          src={
            'https://media.discordapp.net/attachments/721761354846961716/736475852229050388/maximus3.png?width=423&height=592'
          }
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleCloseCard}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {currentCard && (
            // <img className={classes.cardContainer} src={currentCard.imageUrl} /> https://media.discordapp.net/attachments/721761354846961716/736475852229050388/maximus3.png?width=423&height=592
            <img
              className={classes.cardContainer}
              src={
                'https://media.discordapp.net/attachments/721761354846961716/736475852229050388/maximus3.png?width=423&height=592'
              }
            />
          )}
        </DialogContent>
        {currentCard && (
          <DialogTitle id="alert-dialog-title">
            {currentCard.playerName} - {currentCard.rarity}
          </DialogTitle>
        )}
      </Dialog>
    </Grid>
  )
}

export default PlayerCard
