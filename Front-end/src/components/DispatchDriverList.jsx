import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import styled from "styled-components";

const TableContainer = styled.div`
  max-height: 320px;
  width: 100%;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #f2f2f2;
  th {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
`;

const TbodyContainer = styled.div`
  max-height: 300px;
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
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

function DispatchDriverList(props) {
  const { callId } = useParams();
  const [driverList, setDriverList] = useState([]);
  const { updateDriverId } = props;
  const {driverLng, driverLat} = props;
  const {updateDriverLng, updateDriverLat} = props;

  const handleRowClick = (
    (driverId, driverLng, driverLat) => {
      updateDriverId(driverId);
      updateDriverLng(driverLng);
      updateDriverLat(driverLat);
    })
    //[updateDriverId, updateDriveLng, updateDriverLat]
  

  // const url = `http://k9s101.p.ssafy.io:9000/api/dispatch/1`;
  const url = `http://localhost:9000/api/dispatch/1`;
  // 일단 임시로 callId 1로 고정한 url 사용. useParam이나 redux로 수정예정

  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("driverList : " + data);
        setDriverList(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [callId]);

  console.log("driverList : ", driverList);

  // 데이터를 react-table 형식에 맞게 변환
  const columns = React.useMemo(
    () => [
      {
        Header: "Driver",
        accessor: "driverName",
      },
      {
        Header: "Plate Number",
        accessor: "vehicleNo",
      },
      {
        Header: "Distance",
        accessor: "distance",
      },
    ],
    []
  );

  const data = React.useMemo(() => {
    return driverList.map((item) => {
      return {
        driverId: item.driverId,
        driverName: item.driverName,
        vehicleNo: item.vehicleNo,
        distance: item.distance,
        driverLongitude : item.driverLongitude,
        driverLatitude : item.driverLatitude
      };
    });
  }, [driverList]);

  // react-table 초기화
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // 표시할 최대 행 수 (4개 이하의 데이터인 경우를 대비)
  const maxRows = 4;

  console.log("driverList called");

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
                <tr
                  {...row.getRowProps()}
                  onClick={() => handleRowClick(
                    row.original.driverId,
                    row.original.driverLongitude,
                    row.original.driverLatitude)}
                >
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </tr>
              );
            })}
            {Array(Math.max(0, maxRows - rows.length))
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

export default DispatchDriverList;
