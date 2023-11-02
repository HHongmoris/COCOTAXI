import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import styled from "styled-components";

const TableContainer = styled.div`
  max-height: 240px;
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
    padding: 6px;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
    text-align: left;
  }
`;

const TbodyContainer = styled.div`
  max-height: 300px;
  display: block;
  overflow-y: scroll;
`;

const Tbody = styled.tbody`
  td {
    padding: 6px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
  }
`;

const TableCell = styled.td`
  height: 30px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

function ClientList(props) {
  const { callId } = props;
  const [clientList, setClientList] = useState([]);
  const { centerLat, centerLng } = props;
  const { updateCallId } = props;
  // MapComponent 갱신을 위한 콜백 함수
  const { updateCenterLat, updateCenterLng } = props;

  // let map;

  const handleRowClick = (startPointLatitude, startPointLongitute, callId) => {
    // if (window.google && map) {
    //   const latLng = new window.google.maps.LatLng(
    //     startPointLatitude,
    //     startPointLongitute
    //   );
    //   map.setCenter(latLng);
    //   console.log("21321312312 row - startPointLatitude:");
    // }
    updateCallId(callId);
    updateCenterLat(startPointLatitude);
    updateCenterLng(startPointLongitute);
  };

  const url = `http://k9s101.p.ssafy.io:9000/api/callings`;
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("clientList : ", data);
        setClientList(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [callId]);

  // 좌표를 주소로 변환하는 함수
  async function reverseGeocodeCoordinates(latitude, longitude) {
    // const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.display_name) {
        const address = data.display_name;
        console.log("주소:", address);
        return address;
      } else {
        console.error("좌표를 주소로 변환할 수 없습니다.");
        return "주소 없음";
      }
    } catch (error) {
      console.error("네트워크 오류:", error);
      return "네트워크 오류";
    }
  }

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
        Header: "Pick-up Location",
        accessor: "pickUpLocation",
      },
      {
        Header: "Drop-off Location",
        accessor: "dropOffLocation",
      },
      {
        Header: "Distance",
        accessor: "distance",
      },
    ],
    []
  );

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const newData = await Promise.all(
        clientList.map(async (item) => {
          const date = new Date(item.callCreatedTime);

          const 시간 = ("0" + date.getHours()).slice(-2);
          const 분 = ("0" + date.getMinutes()).slice(-2);
          const 초 = ("0" + date.getSeconds()).slice(-2);

          const formattedTime = `${시간}:${분}:${초}`;

          const pickUpLocation = await reverseGeocodeCoordinates(
            item.startPointLatitude,
            item.startPointLongitute
          );
          console.log(pickUpLocation);

          const dropOffLocation = await reverseGeocodeCoordinates(
            item.endPointLatitude,
            item.endPointLongitute
          );
          console.log(dropOffLocation);

          return {
            callId: item.callId,
            callCreatedTime: formattedTime,
            vehicleType: item.vehicleType,
            pickUpLocation: pickUpLocation,
            dropOffLocation: dropOffLocation,
            startPointLatitude: item.startPointLatitude,
            startPointLongitute: item.startPointLongitute,
            endPointLatitude: item.endPointLatitude,
            endPointLongitute: item.endPointLongitute,
            distance: item.distance,
          };
        })
      );
      // console.log(pickUpLocation);
      // console.log("clientList", clientList);

      setData(newData);
      console.log(data);
    };

    fetchData();
  }, [clientList]);
  console.log(data);

  // react-table 초기화
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // 표시할 최대 행 수 (4개 이하의 데이터인 경우를 대비)
  const maxRows = 6;

  console.log("clientList called");

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
                      row.original.startPointLongitute,
                      row.original.callId
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
