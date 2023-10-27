import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import styled from "styled-components";

const TableContainer = styled.div`
  max-height: 300px;
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
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

function ClientList(props) {
  const { callId } = useParams();
  const [clientList, setClientList] = useState([]);
  const { centerLat, centerLng } = props;

  // MapComponent 갱신을 위한 콜백 함수
  const { updateCenterLat, updateCenterLng } = props;

  // let map;

  const handleRowClick = (startPointLatitude, startPointLongitute) => {
    // if (window.google && map) {
    //   const latLng = new window.google.maps.LatLng(
    //     startPointLatitude,
    //     startPointLongitute
    //   );
    //   map.setCenter(latLng);
    //   console.log("21321312312 row - startPointLatitude:");
    // }
    updateCenterLat(startPointLatitude);
    updateCenterLng(startPointLongitute);
    console.log("Clicked row - startPointLatitude:", centerLat);
    console.log("Clicked row - startPointLongitute:", centerLng);
  };

  const url = `http://k9s101.p.ssafy.io:9000/api/callings`;

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
        Header: "startPointLongitute",
        accessor: "startPointLongitute",
      },
      {
        Header: "endPointLatitude",
        accessor: "endPointLatitude",
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
        callId: item.callId,
        callCreatedTime: item.callCreatedTime,
        vehicleType: item.vehicleType,
        startPointLatitude: item.startPointLatitude,
        startPointLongitute: item.startPointLongitute,
        endPointLatitude: item.endPointLatitude,
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
  const maxRows = 6;

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
                  onClick={() =>
                    handleRowClick(
                      row.original.startPointLatitude,
                      row.original.startPointLongitute
                    )
                  }
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

export default ClientList;
