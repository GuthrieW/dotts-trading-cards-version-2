import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useStyles from './Community.styles'
import Router from 'next/router'
import { DOTTS_ACCESS_TOKEN } from '../../utils/constants'

const columns = [
  { id: 'isflUsername', label: 'Name', minWidth: 170 },
  { id: 'ownedCards', label: 'Number of Cards', minWidth: 100 },
]

function CommunityPage() {
  const classes = useStyles()
  const [communityAccounts, setCommunityAccounts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const accounts = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/users/allUsers`,
        data: {},
      })

      if (accounts.data.error) {
      } else {
        setCommunityAccounts(accounts.data)
      }
    }

    fetchData()
  }, [])

  const handleOnClick = (isflUsername) => {
    Router.push({
      pathname: `/Community/${isflUsername}`,
      query: { isflUsername: isflUsername },
    })
  }

  return (
    <>
      <h1>Community Page</h1>
      <Paper className={classes.root}>
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
      </Paper>
    </>
  )
}

export default CommunityPage
