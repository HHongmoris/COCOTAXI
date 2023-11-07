import React, { useEffect, useState, Component } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ClientList from "./ClientList";
import DispatchDriverList from "./DispatchDriverList";
import axios from "axios";
import polyline from "@mapbox/polyline";
import { useCallback } from "react";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [centerLat, setCenterLat] = useState(35.092);
  const [centerLng, setCenterLng] = useState(128.854);
  const [driverLat, setDriverLat] = useState(null);
  const [driverLng, setDriverLng] = useState(null);
  const [circle, setCircle] = useState(null);
  const [openPage, setOpenPage] = useState(false);
  const [coords, setcoords] = useState(null);
  const [callId, setCallId] = useState(0);
  const [driverId, setDriverId] = useState(0);
  const [marker1, setMarker1] = useState(null);
  const [marker2, setMarker2] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  const updateCenterLat = (startPointLatitude) => {
    setCenterLat(startPointLatitude);
  };

  const updateCenterLng = (startPointLongitude) => {
    setCenterLng(startPointLongitude);
  };

  const updateDriverLat = (driverLatitude) => {
    setDriverLat(driverLatitude);
  };

  const updateDriverLng = (driverLongitude) => {
    setDriverLng(driverLongitude);
  };

  const updateCallId = (callId) => {
    setCallId(callId);
  };

  const updateDriverId = (driverId) => {
    setDriverId(driverId);
  };

  const driverFlag = useSelector((state) => state.driver_flag);
  const clientFlag = useSelector((state) => state.client_flag);
  console.log("callId : " + callId);
  console.log("driverId : " + driverId);

  // 마크 사진 적용
  useEffect(() => {
    if (map) {
      const multiPolylineCoordinates = [];
      multiPolylineCoordinates.push(coords); // 리스트를 눌렀을 때 coords 에 값이 저장되어 있게 코드 수정해야함
      console.log(multiPolylineCoordinates); // 지금 실행화면에서 경로보기 누르고 vscode 상에서 컨트롤 + s 눌러서 저장되어야지만 좌표나옴

      function animateCircle(polyline2) {
        const path = polyline2.getPath();
        const reversedPath = new google.maps.MVCArray(); // 뒤집힌 경로를 저장할 새로운 배열

        for (let i = path.getLength() - 1; i >= 0; i--) {
          reversedPath.push(path.getAt(i)); // 경로를 거꾸로 뒤집어 새 배열에 추가
        }

        polyline2.setPath(reversedPath); // 뒤집힌 경로를 폴리라인에 설정

        let count = 3000;

        window.setInterval(() => {
          count = (count - 1 + 3000) % 3000;

          const icons = polyline2.get("icons");

          icons[0].offset = (3000 - count) / 15 + "%"; // 방향을 반대로 변경
          polyline2.set("icons", icons);
        }, 20);
      }

      const lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 5,
        fillColor: "#0004ff", // 채우기 색상 설정
        fillOpacity: 1,
        strokeWeight: 1, // 테두리 두께 설정
        strokeColor: "#10189f", // 테두리 색상 설정
        strokeOpacity: 1.0, // 테두리 불투명도 설정
        strokeWeight: 2, // 테두리 굵기 설정
      };

      multiPolylineCoordinates.forEach((coordinates) => {
        const polyline = new window.google.maps.Polyline({
          path: coordinates,
          strokeColor: "#0004ff",
          strokeOpacity: 1.0,
          strokeWeight: 10,
        });

        const polyline2 = new google.maps.Polyline({
          path: coordinates,
          icons: [
            {
              icon: lineSymbol,
              offset: "100%",
            },
          ],
          strokeColor: "#5678ff",
          strokeOpacity: 1.0,
          strokeWeight: 5,
          map: map,
        });

        polyline.setMap(map);
        animateCircle(polyline2);
      });
    }
  }, [coords, map]);

  // 시작하자마자 구글 맵 적용
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcpJXGOLDdWsqoSBrIUOZEDtSXNoGtTvw&libraries=geometry`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.onload = initMap;
      document.head.appendChild(googleMapsScript);
      console.log("googleAPI called");
    };

    const initMap = () => {
      const newMap = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat: centerLat, lng: centerLng },
          zoom: 12,
        }
      );

      setMap(newMap);
    };

    loadGoogleMapsScript();
  }, [centerLat, centerLng]);

  // 원 그리기
  const drawCircle = (lat, lng) => {
    if (map) {
      const newCircle = new window.google.maps.Circle({
        strokeColor: "#4158c1",
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: "#6c8fe8",
        fillOpacity: 0.2,
        map,
        center: { lat, lng },
        radius: 6000,
      });
      setCircle(newCircle);
    }
  };

  useEffect(() => {
    // 출발지 도착지가 들어가는 부분, OSM 에서 위 형식을 맞춰 넣어야함 / 형식 추가
    const startLocation = `${centerLng},${centerLat}`; // 손님의 시작부분
    const endLocation = `${driverLng},${driverLat}`; // 드라이버 위치
    const apiKey = "5b3ce3597851110001cf624888240bdfef7d494bb8e36cbbd1683d77";
    // 출발
    if (clientFlag) {
      const marker1 = new window.google.maps.Marker({
        position: { lat: centerLat, lng: centerLng },
        map: map, // 마커를 지도에 추가
        icon: "https://ssafy-cocotaxi.s3.ap-northeast-2.amazonaws.com/client.png",
      });
      setMarker1(() => marker1);
    }

    // if(!clientFlag) {
    //   setMarker1(null);
    //   marker1.setMap(null);
    // }
    if (driverFlag) {
      // 도착지점 마크 생성
      const marker2 = new window.google.maps.Marker({
        position: { lat: driverLat, lng: driverLng },
        map: map, // 마커를 지도에 추가
        icon: "https://ssafy-cocotaxi.s3.ap-northeast-2.amazonaws.com/car.png",
      });

      // 정보 창 내용 설정
      const contentString = `
          <div>
            <h2>홍성민</h2>
            <p>차번호: 12A 1242</p>
            <p>평점: 0.1</p>
            <p>전화 번호: 010-8299-8470</p>
            <button id="callDriverButton">전화 걸기</button>
          </div>
          `;

      // 정보 창 생성
      const infoWindow = new window.google.maps.InfoWindow({
        content: contentString,
      });

      // 마커 클릭 이벤트 리스너 추가
      marker2.addListener("click", () => {
        // 클릭 시 정보 창 열도록 설정
        infoWindow.open(map, marker2);
      });
      setMarker2(() => marker2);
    }

    axios
      .get(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startLocation}&end=${endLocation}`
      )
      .then((response) => {
        const data = response.data;

        //ORS 에서 경로를 불러오는 부분
        const routeCoordinatesJSON = data.features[0].geometry.coordinates;
        const coords = [];

        // 형식에 맞춰 경로 변환
        const decodedPolyline = routeCoordinatesJSON;
        decodedPolyline.forEach((coordinate) => {
          coords.push({
            lat: coordinate[1],
            lng: coordinate[0],
          });
        }, []);

        // setPolylineCoords(coords);

        console.log("coords : ", coords);
        setcoords(coords);

        // 지도를 첫 번째 좌표로 이동
        const firstCoord = coords[0];
        const latLng = new window.google.maps.LatLng(
          firstCoord.latitude,
          firstCoord.longitude
        );
        map.setCenter(latLng);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [map, centerLat, centerLng, driverLat, driverLng, clientFlag, driverFlag]);

  useEffect(() => {
    if (map) {
      if (clientFlag) {
        const latLng = new window.google.maps.LatLng(centerLat, centerLng);
        map.setCenter(latLng);
        map.setZoom(15);
      } else if (driverFlag) {
        const latLng = new window.google.maps.LatLng(driverLat, driverLng);
        map.setCenter(latLng);
        map.setZoom(15);
        circle.setMap(null);
      }
      if (circle) {
        circle.setMap(null);
      }
      if (openPage) {
        drawCircle(centerLat, centerLng);
      } else {
        setOpenPage(true);
      }
    }
  }, [driverLat, driverLng, map]);

  const onClickDispatch = () => {
    axios
      .post("http://k9s101.p.ssafy.io:4000/api/dispatch", null, {
        // .post("http://localhost:9000/api/dispatch", null, {
        params: {
          callId: callId,
          driverId: driverId,
        },
      })
      .then((response) => {
        console.log("Dispatch Activated", response);
        alert("강제 배차가 완료되었습니다.");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Dispatch Activated");
  };

  console.log("mapPage called");

  return (
    <div>
      <div style={{ position: "relative", height: "100vh", width: "180vh" }}>
        <div
          id="map"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          {/* 맵 컨텐츠 */}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 15,
            left: 30,
            width: "700px",
            background: "white",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            zIndex: 2,
          }}
        >
          {/* 클라이언트 리스트 컴포넌트 */}
          <ClientList
            callId={callId}
            centerLat={centerLat}
            centerLng={centerLng}
            updateCallId={updateCallId}
            updateCenterLat={updateCenterLat}
            updateCenterLng={updateCenterLng}
          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 15,
            right: 60,
            width: "350px",
            background: "white",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            zIndex: 2,
          }}
        >
          <DispatchDriverList
            callId={callId}
            updateDriverId={updateDriverId}
            driverLat={driverLat}
            driverLng={driverLng}
            updateDriverLng={updateDriverLng}
            updateDriverLat={updateDriverLat}
          />
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
      </div>
    </div>
  );
};

export default MapComponent;
