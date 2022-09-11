import React from 'react'

type TableProps = {
  getTableProps: Function
  headerGroups: any[]
  getTableBodyProps: Function
  rows: any[]
  prepareRow: Function
  onRowClick?: Function
}

const Table = ({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  rows,
  prepareRow,
  onRowClick,
}: TableProps) => (
  <div className="my-2 rounded-md border border-t-0 border-neutral-800 overflow-x-auto overflow-y-hidden">
    <table className="w-full" {...getTableProps()}>
      <thead className="bg-neutral-800 text-gray-100 relative">
        {headerGroups.map((headerGroup, headerGroupIndex) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroupIndex}
            className="table-row"
          >
            {headerGroup.headers.map((header, headerIndex) => (
              <th
                {...header.getHeaderProps(header.getSortByToggleProps())}
                key={headerIndex}
                className="h-12 px-1 font-normal bg-neutral-800 relative first:pl-4 last:pr-4"
                title={header.title}
              >
                {header.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        {...getTableBodyProps()}
        className="table-row-group bg-neutral-700 mx-auto my-0 align-middle relative"
      >
        {rows.map((row, index) => {
          console.log('row', row)
          prepareRow(row)
          return (
            <tr
              {...row.getRowProps()}
              key={index}
              className="hover:bg-neutral-500"
              onClick={() => onRowClick(row)}
            >
              {row.cells.map((cell, index) => (
                <td
                  {...cell.getCellProps()}
                  key={index}
                  className="p-2 text-center"
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          )
        })}
        {rows.length > 0 &&
          Array(10 - rows.length)
            .fill(undefined)
            .map((row, index) => {
              const fakeRow = rows[0]
              prepareRow(fakeRow)
              return (
                <tr {...fakeRow?.getRowProps()} key={index} onClick={() => {}}>
                  {fakeRow?.cells.map((cell, index) => (
                    <td
                      {...cell.getCellProps()}
                      key={index}
                      className="p-2 text-center"
                    >
                      {'\u00A0'}
                    </td>
                  ))}
                </tr>
              )
            })}
      </tbody>
    </table>
  </div>
)

export default Table
