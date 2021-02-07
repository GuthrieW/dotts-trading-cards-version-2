import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { DOTTS_ACCESS_TOKEN, API_URL } from '../../../utils/constants';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from '@material-ui/core';

const CardFormDialog = ({ rowData, open, setOpen }) => {
  console.log('card form')
  console.log(rowData)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <TextField
          id="name"
          label="Player Name"
          fullWidth
          defaultValue={rowData && rowData[0]}
        />
        <TextField
          id="name"
          label="Player Team"
          fullWidth
          defaultValue={rowData && rowData[1]}
        />
        <TextField
          id="name"
          label="Rarity"
          fullWidth
          defaultValue={rowData && rowData[2]}
        />
        <TextField
          id="name"
          label="Image URL"
          fullWidth
          defaultValue={rowData && rowData[3]}
        />
        <TextField
          id="name"
          label="Approved"
          fullWidth
          defaultValue={rowData && rowData[4]}
        />
        <TextField
          id="name"
          label="Current Rotation"
          fullWidth
          defaultValue={rowData && rowData[5]}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
          </Button>
        <Button onClick={handleClose} color="primary">
          Update
          </Button>
      </DialogActions>
    </Dialog>
  );
}

/**
 * This requires the ability to search for cards based on name, rarity, team, approved, and currentRotation.
 * Once a card is found we need to be able to edit name, team, rarity, imageUrl, approved and currentRotation.
 *
 * playerName: String
 * playerTeam: String - Can only be one of the current ISFL teams, made an array in utils\constants.ts
 * rarity: String - Can only be one of the current rarities, made an array in utils\constants.ts
 * imageUrl: String
 * approved: boolean
 * currentRotation: boolean
 */


const CardEditorPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [currentRow, setCurrentRow] = useState();

  const columns = [
    "player_name",
    "player_team",
    "rarity",
    "image_url",
    {
      name: "approved",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          value.toString()
        )
      }
    },
    {
      name: "current_rotation",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          value.toString()
        )
      }
    }
  ];

  const options = {
    filterType: 'dropdown',
    download: false,
    print: false,
    selectableRows: 'none',
    onRowClick: (rowData) => {
      setOpen(true);
      setCurrentRow(rowData);
    }
  };

  useEffect(() => {
    const fetchCards = async () => {
      const fetchedCards = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${API_URL}/api/v1/cards/allCards`,
        data: [],
      })

      console.log(fetchedCards)
      setCards(fetchedCards.data)
      setIsLoading(false);
    }

    fetchCards()
  }, [])

  return (
    <>
      <h1>Card Editor Page</h1>
      {isLoading && <div>Loading</div>}
      {!isLoading && <>
        <CardFormDialog rowData={currentRow} open={open} setOpen={setOpen} />
        <MUIDataTable
          title={"Cards"}
          data={cards}
          columns={columns}
          options={options}
        /></>}
    </>
  )
}

export default CardEditorPage
