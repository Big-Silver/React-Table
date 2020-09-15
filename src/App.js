import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import Table from "./Table";
import logo from "./logo.svg";
import "./App.scss";

const axios = require("axios");

const Styles = styled.div`
  padding: 1rem;
  align-items: center;
  table {
    border-spacing: 0;
    border: 1px solid black;
    opacity: 0.9;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid white;
      border-right: 1px solid white;
      background-color: #282c34;
      color: white;
      :last-child {
        border-right: 0;
      }
    }
    td {
      width: 200px;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

function App() {
  const [tableRowData, setTableRowData] = useState([]);
  useEffect(() => {
    getTableData();
    const interval = setInterval(() => {
      getTableData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  async function getTableData() {
    try {
      const response = await axios.get(
        "https://liquality.io/swap/agent/api/swap/marketinfo"
      );
      console.log(response);
      setTableRowData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Pair",
        columns: [
          {
            Header: "From",
            accessor: "from",
            minWidth: 100,
          },
          {
            Header: "To",
            accessor: "to",
            minWidth: 100,
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Rate",
            accessor: "rate",
            minWidth: 300,
          },
          {
            Header: "Updated At",
            accessor: "updatedAt",
            Cell: ({ value }) => moment(value).format("YYYY-MM-DD"),
            minWidth: 300,
          },
        ],
      },
    ],
    []
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-link">Test Project</p>
      </header>
      <Styles>
        <Table columns={columns} data={tableRowData} />
      </Styles>
    </div>
  );
}

export default App;
