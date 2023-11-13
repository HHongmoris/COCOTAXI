import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDriverLatitude ,setDriverLongitude, isDriverChanged, setDriverId, setCallId } from "../redux/actions";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import styled from "styled-components";
import axios from "axios";

const TableContainer = styled.div`
  max-height: 190px;
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
  background-color: ${(props) => (props.isClicked ? "#e0e0e0" : "inherit")};

  &:hover {
    background-color: ${(props) => (props.isClicked ? "#e0e0e0" : "#e0e0e0")};
  }
`;

const TableCell = styled.td`
  height: 30px;
`;

function DispatchDriverList() {
  const [driverList, setDriverList] = useState([]);
  const driverLatitude = useSelector((state)=>state.driver_latitude)
  const driverLongitude = useSelector((state)=>state.driver_longitude)
  const callId = useSelector((state)=>state.call_id)
  const driverId = useSelector((state)=>state.driver_id)
  const dispatch = useDispatch();
  const [clickedDriver, setClickedDriver] = useState(null);

  const handleRowClick = (driverId, driverLng, driverLat) => {
    dispatch(setDriverId(driverId));
    setClickedDriver(driverId);
    if (driverLng !== driverLongitude && driverLat !== driverLatitude) {
      dispatch(isDriverChanged(true));
      dispatch(setDriverLatitude(driverLat));
      dispatch(setDriverLongitude(driverLng));
    }
  };

  //[updateDriverId, updateDriveLng, updateDriverLat]

  // const url = `http://k9s101.p.ssafy.io:4000/api/dispatch/${callId}`;
  const url = `http://localhost:4000/api/dispatch/${callId}`;

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
  console.log("dispatchCallId", callId);
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
        driverLongitude: item.driverLongitude,
        driverLatitude: item.driverLatitude,
      };
    });
  }, [driverList]);

  // react-table 초기화
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const onClickDispatch = () => {
    axios
      .post("http://k9s101.p.ssafy.io:4000/api/dispatch", null, {
        params: {
          callId: callId,
          driverId: driverId,
        },
      })
      .then((response) => {
        console.log("Dispatch Activated", response);
        alert("강제 배차가 완료되었습니다.");
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Dispatch Activated");
  };

  // 표시할 최대 행 수 (4개 이하의 데이터인 경우를 대비)
  const maxRows = 99;

  console.log("driverList called");

  return (
    <div>
    <div>
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
                      row.original.driverId,
                      row.original.driverLongitude,
                      row.original.driverLatitude
                    )
                  }
                  isClicked={row.original.driverId === clickedDriver} // 클릭된 행에만 스타일 적용
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
    </div>
    <div>
    <button
    onClick={onClickDispatch}
    style={{
      width: "100%", // 버튼이 표 안에 가득 차도록 너비 설정
      padding: "10px", // 원하는 패딩 설정
      border: "none", // 테두리 제거
      color: "black", // 글자색 설정
      cursor: "pointer", // 커서 스타일 설정
    }}
  >
    Dispatch
  </button>
  </div>
  </div>
  );
}

export default DispatchDriverList;
