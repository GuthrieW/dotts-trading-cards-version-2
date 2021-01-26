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
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import useStyles from './Community.styles'
import { API_URL } from '../../utils/constants'

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
        method: 'post',
        url: `${API_URL}/api/v1/users/allUsers`,
        data: {},
      })

      setCommunityAccounts(accounts.data)
    }

    fetchData()
  }, [])

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
              {communityAccounts.map((row) => {
                if (row.isflUsername === '') {
                  return
                }
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.isflUsername}
                  >
                    {columns.map((column) => {
                      if (column.id === 'ownedCards') {
                        const value = row[column.id].length

                        return (
                          <Link href={`/Community/${row.isflUsername}`}>
                            <TableCell key={column.id}>{value}</TableCell>
                          </Link>
                        )
                      } else {
                        const value = row[column.id]

                        return (
                          <Link href={`/Community/${row.isflUsername}`}>
                            <TableCell key={column.id}>{value}</TableCell>
                          </Link>
                        )
                      }
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
