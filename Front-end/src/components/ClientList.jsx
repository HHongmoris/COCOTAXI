import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import styled from "styled-components";

const TableContainer = styled.div`
  max-height: 400px;
  width: 100%;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #f2;
  th {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
`;

const TbodyContainer = styled.div`
  max-height: 400px;
  overflow-y: scroll;
  display: block;
`;

const Tbody = styled.tbody`
  td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
`;

const TableCell = styled.td`
  height: 40px;
`;

function ClientList() {
  const { callId } = useParams();
  const [clientList, setClientList] = useState([]); // Fixed typo in variable name

  const url = `http://k9s101.p.ssafy.io:9000/api/callings/all`;

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setClientList(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [callId]);

  console.log(clientList);

  // 데이터를 react-table 형식에 맞게 변환
  const columns = React.useMemo(
    () => [
      {
        Header: "callCreatedTime",
        accessor: "callCreatedTime",
      },
      {
        Header: "vehicleType",
        accessor: "vehicleType",
      },
      {
        Header: "startPointLatitude",
        accessor: "startPointLatitude",
      },
      {
        Header: "endPointLatitude",
        accessor: "endPointLatitude",
      },
      {
        Header: "startPointLongitute",
        accessor: "startPointLongitute",
      },
      {
        Header: "endPointLongitute",
        accessor: "endPointLongitute",
      },
      {
        Header: "Distance",
        accessor: "distance",
      },
    ],
    []
  );

  const data = React.useMemo(() => {
    return clientList.map((item) => {
      return {
        callCreatedTime: item.callCreatedTime,
        vehicleType: item.vehicleType,
        startPointLatitude: item.startPointLatitude,
        endPointLatitude: item.endPointLatitude,
        startPointLongitute: item.startPointLongitute,
        endPointLongitute: item.endPointLongitute,
        distance: item.distance,
      };
    });
  }, [clientList]);

  // react-table 초기화
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // 표시할 최대 행 수 (4개 이하의 데이터인 경우를 대비)
  const maxRows = 4;

  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </Thead>
      </Table>
      <TbodyContainer>
        <Table {...getTableProps()}>
          <Tbody>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </tr>
              );
            })}
            {Array(maxRows - rows.length)
              .fill()
              .map((_, index) => (
                <tr key={index}>
                  {columns.map((column, columnIndex) => (
                    <TableCell key={columnIndex}></TableCell>
                  ))}
                </tr>
              ))}
          </Tbody>
        </Table>
      </TbodyContainer>
    </TableContainer>
  );
}

export default ClientList;
