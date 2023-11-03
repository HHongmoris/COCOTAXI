import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setClientFlag, setDriverFlag } from '../redux/actions';
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

const TableRow = styled.tr`
  height: 30px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const TableCell = styled.td`
  height: 30px;
`;

function ClientList(props) {
  const { callId } = props;
  const [clientList, setClientList] = useState([]);
  const { centerLat, centerLng } = props;
  const { updateCallId } = props;
  // MapComponent 갱신을 위한 콜백 함수
  const { updateCenterLat, updateCenterLng } = props;
  const clientFlag = useSelector(state => state.client_flag);
  const driverFlag = useSelector(state => state.driver_flag);
  const dispatch = useDispatch();

  // let map;

  const handleRowClick = (startPointLatitude, startPointLongitude, callId) => {
    updateCallId(callId);
    updateCenterLat(startPointLatitude);
    updateCenterLng(startPointLongitude);
    dispatch(setClientFlag(true));
    dispatch(setDriverFlag(false));
  };


  const url = `http://k9s101.p.ssafy.io:9000/api/callings`;
  //const url = `http://localhost:9000/api/callings`;
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
        Header: "callTime",
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
            item.startPointLongitude
          );
          console.log(pickUpLocation);

          const dropOffLocation = await reverseGeocodeCoordinates(
            item.endPointLatitude,
            item.endPointLongitude
          );
          console.log(dropOffLocation);

          return {
            callId: item.callId,
            callCreatedTime: formattedTime,
            vehicleType: item.vehicleType,
            pickUpLocation: pickUpLocation,
            dropOffLocation: dropOffLocation,
            startPointLatitude: item.startPointLatitude,
            startPointLongitude: item.startPointLongitude,
            endPointLatitude: item.endPointLatitude,
            endPointLongitude: item.endPointLongitude,
            distance: item.distance,
            pickUpLocation: item.pickUpLocation,
            dropOffLocation: item.dropOffLocation,
          };
        })
      );

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
                <TableRow
                  {...row.getRowProps()}
                  onClick={() =>
                    handleRowClick(
                      row.original.startPointLatitude,
                      row.original.startPointLongitude,
                      row.original.callId
                    )
                  }
                >
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
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
