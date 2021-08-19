import {
  Grid,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Badge,
} from '@material-ui/core'
import Image from 'next/image'
import React from 'react'
import useStyles from './PlayerCard.styles'

const PlayerCard = ({
  card,
  className,
  currentCard,
  handleOpenCard,
  handleCloseCard,
  open,
  duplicates,
}) => {
  const classes = useStyles()
  return (
    <Grid key={card.playerName} item xs={6} md={4} lg={3} className={className}>
      <Box onClick={() => handleOpenCard(card)}>
        <Badge badgeContent={duplicates ? duplicates : null} color={'primary'}>
          <Image
            width={300}
            height={400}
            className={classes.cardContainer}
            src={card.imageUrl}
          />
        </Badge>
      </Box>
      <Dialog
        open={open}
        onClose={handleCloseCard}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {currentCard && (
            <Image width={300} height={400} src={currentCard.imageUrl} />
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
