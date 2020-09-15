import React from "react";
import PropTypes from "prop-types";
import { useTable, useSortBy, usePagination } from "react-table";
import {
  ArrowDownSquare,
  ArrowUpSquare,
  ChevronDoubleLeft,
  ChevronLeft,
  ChevronDoubleRight,
  ChevronRight,
} from "react-bootstrap-icons";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage,
    pageCount,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );
  // Render the UI for your table
  return (
    <>
      <div className="pagination">
        <div>
          <button
            className="pgn-button"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <ChevronDoubleLeft />
          </button>
          <button
            className="pgn-button"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <ChevronLeft />
          </button>
          <span className="pgn-text">
            Page
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button
            className="pgn-button"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <ChevronRight />
          </button>
          <button
            className="pgn-button"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <ChevronDoubleRight />
          </button>
        </div>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 15].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th
                  key={i}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ArrowDownSquare />
                      ) : (
                        <ArrowUpSquare />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <td key={i} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(Object),
  data: PropTypes.arrayOf(Object),
};

export default Table;
