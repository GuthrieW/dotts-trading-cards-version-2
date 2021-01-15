import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@material-ui/core';
import Link from 'next/link';
import React from 'react'
import useStyles from './Community.styles';

const mockCommunity = [{
  nsfl_username: "Mithrandir",
  is_admin: true,
  google_id: "107002673300031340763",
  google_display_name: "Mithrandir NSFL",
  creation_date: '2020-06-22T03:36:54.000+00:00',
  owned_cards: 2,
  can_purchase_pack: true,
  __v: 0,
  number_of_packs: 0,
  is_submitter: false,
  number_of_ultimus_packs: 0,
},
{
  nsfl_username: "Nokazoa",
  is_admin: false,
  is_processor: true,
  is_submitter: true,
  google_id: "112267298725272882561",
  google_display_name: "Noah Hensley",
  creation_date: '2020-07-23T00:10:24.000+00:00',
  can_purchase_pack: true,
  owned_cards: 3,
  __v: 0,
  number_of_packs: 1,
  number_of_ultimus_packs: 0,
},
{
  nsfl_username: "AL_GRINGO",
  is_admin: false,
  is_processor: false,
  is_submitter: true,
  google_id: "117543010403433399786",
  google_display_name: "Kevin Jimenez",
  creation_date: '2020-07-24T02:58:32.000+00:00',
  can_purchase_pack: true,
  owned_cards: 3,
  __v: 0,
  number_of_packs: 1,
  number_of_ultimus_packs: 0,
}
];

const columns = [
  { id: 'nsfl_username', label: 'Name', minWidth: 170 },
  { id: 'owned_cards', label: 'Number of Cards', minWidth: 100 },
];

function CommunityPage() {
  const classes = useStyles();

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
              {mockCommunity.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.nsfl_username}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <Link href={`/Community/${row.nsfl_username}`}>
                          <TableCell key={column.id}>
                            {value}
                          </TableCell>
                        </Link>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  )
}

export default CommunityPage
