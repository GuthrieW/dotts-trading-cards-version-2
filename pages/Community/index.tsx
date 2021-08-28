import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tab,
  TextField,
  Typography,
  Box,
  LinearProgress,
} from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useStyles from './Community.styles'
import Router from 'next/router'
import { DOTTS_ACCESS_TOKEN } from '../../utils/constants'
import { AppBar } from '@material-ui/core'
import { Tabs } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'

const filter = createFilterOptions()

const columns = [
  { id: 'isflUsername', label: 'Name', minWidth: 170 },
  { id: 'ownedCards', label: 'Number of Cards', minWidth: 100 },
]

function CommunityPage() {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [communityAccountsLoading, setCommunityAccountsLoading] = useState(
    false
  )
  const [communityAccounts, setCommunityAccounts] = useState([])
  const [searchTerm, setSearchTerm] = useState<any>({})
  const [allCards, setAllCards] = useState([])
  const [allCardsLoading, setAllCardsLoading] = useState(false)
  const [searchResultLoading, setSearchResultLoading] = useState(false)
  const [owners, setOwners] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setCommunityAccountsLoading(true)
      const accounts = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/users/allUsers`,
        data: {},
      })

      if (accounts.data.error) {
        console.log('error:', accounts.data.error)
        setCommunityAccountsLoading(false)
      } else {
        setCommunityAccountsLoading(false)
        setCommunityAccounts(accounts.data)
        return
      }

      return
    }

    fetchData()
  }, [])

  useEffect(() => {
    setAllCardsLoading(true)
    const fetchAllCards = async () => {
      const allCards = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/cards/allCards`,
        data: {},
      })

      if (allCards.data) {
        const uniqueFilteredCards = new Set()
        const uniqueCards = allCards.data.filter((card) => {
          if (uniqueFilteredCards.has(card._id)) {
            return false
          }
          uniqueFilteredCards.add(card._id)
          return true
        })
        setAllCards(uniqueCards)
        console.log(uniqueCards)
        setAllCardsLoading(false)
        return
      }

      if (allCards.data.error) {
        console.log(allCards.data.error)
        setAllCardsLoading(false)
      }
    }

    fetchAllCards()
  }, [value])

  const fetchSearchResult = async (id) => {
    setSearchResultLoading(true)
    const search = await axios({
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
      },
      method: 'post',
      url: `/api/v1/cards/cardOwners`,
      data: { _id: id },
    })

    if (search.data) {
      setSearchResultLoading(false)
      setOwners(search.data.cardOwners)
      return
    }

    if (search.data.error) {
      console.log(search.data.error)
      setSearchResultLoading(false)
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleOnClick = (isflUsername) => {
    Router.push({
      pathname: `/Community/${isflUsername}`,
      query: { isflUsername: isflUsername },
    })
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
          <Tab label="Card Finder" value={0} />
          <Tab label="Users" value={1} />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <>
          <Box mt={2}>
          <Autocomplete
            id="grouped-demo"
            options={allCards.sort((a, b) => -b.rarity.localeCompare(a.rarity))}
            loading={allCardsLoading}
            groupBy={(option) => option.rarity}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue
              }
              // Regular option
              return option.playerName
            }}
            clearOnBlur={false}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter player name"
                variant="outlined"
              />
            )}
            onChange={(event, newValue) => {
              if (newValue) {
                setSearchTerm(newValue)
                fetchSearchResult(newValue._id)
              }
            }}
          />
          </Box>
          <Box mt={2} p={2}>
            {owners && owners.length > 0 && (
              <Typography variant="h6">
                Card owners of: {searchTerm.playerName} - {searchTerm.rarity}
              </Typography>
            )}
            <Paper className={classes.root}>
              { searchResultLoading ? <LinearProgress /> : 
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableBody>
                      {owners &&
                        owners.length > 0 &&
                        owners.map((row, index) => {
                          if (row.isflUsername === '') {
                            return
                          }
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={`${row.isflUsername}-${index}`}
                            >
                              {columns.map((column, index) => {
                                const value = row[column.id]

                                return (
                                  <TableCell key={`${column.id}-${index}`}>
                                    {value}
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                          )
                        })}
                    </TableBody>
                </Table>
              </TableContainer>
            }
            </Paper>
          </Box>
        </>
      )}
      {value === 1 && (
        <>
          <Paper className={classes.root}>
            {communityAccountsLoading && <LinearProgress />}
            {!communityAccountsLoading && (
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {communityAccounts.map((row, index) => {
                      if (row.isflUsername === '') {
                        return
                      }
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={`${row.isflUsername}-${index}`}
                        >
                          {columns.map((column, index) => {
                            const value =
                              column.id === 'ownedCards'
                                ? row[column.id].length
                                : row[column.id]

                            return (
                              <TableCell
                                onClick={() => handleOnClick(row.isflUsername)}
                                key={`${column.id}-${index}`}
                              >
                                {value}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </>
      )}
    </>
  )
}

export default CommunityPage
