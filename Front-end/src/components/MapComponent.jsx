import React, { useEffect, useState, Component } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDriverFlag, setClientFlag } from "../redux/actions";
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
  console.log("공습경보 !! driverFlag : " + driverFlag);
  console.log("공습경보 !! clientFlag : " + clientFlag);

  console.log("callId : " + callId);
  console.log("driverId : " + driverId);

  // useeffect 말고 다른 걸로 버튼 눌럿을때 적용되는 방식으로 바꿔야함
  useEffect(() => {
    if (map) {
      const multiPolylineCoordinates = [];
      multiPolylineCoordinates.push(coords); // 리스트를 눌렀을 때 coords 에 값이 저장되어 있게 코드 수정해야함
      console.log(multiPolylineCoordinates); // 지금 실행화면에서 경로보기 누르고 vscode 상에서 컨트롤 + s 눌러서 저장되어야지만 좌표나옴

      multiPolylineCoordinates.forEach((coordinates) => {
        const polyline = new window.google.maps.Polyline({
          path: coordinates,
          strokeColor: "blue", // 선 색상 설정
          strokeOpacity: 1.0, // 선 불투명도 설정
          strokeWeight: 4, // 선 굵기 설정
        });
        polyline.setMap(map);
      });
    }
  }, [coords, map]);

  useEffect(() => {
    if (map) {
      if (clientFlag) {
        console.log("공습경보!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11");
        const latLng = new window.google.maps.LatLng(centerLat, centerLng);
        map.setCenter(latLng);
        map.setZoom(15);
      }
      if (driverFlag) {
        console.log("공습경보!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11");
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
  }, [centerLat, centerLng, driverLng, driverLat, map]);

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
          center: { lat: centerLng, lng: centerLat },
          zoom: 12,
        }
      );
      setMap(newMap);
    };

    loadGoogleMapsScript();
  }, []);

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

  const getAndSetPolylineCoords = useCallback(() => {
    // 출발지 도착지가 들어가는 부분, OSM 에서 위 형식을 맞춰 넣어야함 / 형식 추가
    const startLocation = `${centerLng},${centerLat}`; // 손님의 시작부분
    const endLocation = `${driverLng},${driverLat}`; // 드라이버 위치
    console.log(startLocation + "그리고" + endLocation);
    const apiKey = "5b3ce3597851110001cf624888240bdfef7d494bb8e36cbbd1683d77";

    // console.log("아무거나");
    //출발
    // const marker1 = new google.maps.Marker({
    //   position: { lat: centerLng, lng: centerLat },
    //   map: map, // 마커를 지도에 추가
    //   icon: "https://ssafy-cocotaxi.s3.ap-northeast-2.amazonaws.com/client.png",
    // });

    // // 도착지점 마크 생성
    // const marker2 = new google.maps.Marker({
    //   position: { lat: driverLng, lng: driverLat },
    //   map: map, // 마커를 지도에 추가
    //   icon: "https://ssafy-cocotaxi.s3.ap-northeast-2.amazonaws.com/car.png",
    // });

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

        console.log(coords);
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
  }, [centerLat, centerLng, driverLat, driverLng, map]);

  const onClickDispatch = () => {
    axios;
    HEAD.post("http://k9s101.p.ssafy.io:9000/api/dispatch", null, {
      // .post("http://localhost:9000/api/dispatch", null, {
      params: {
        callId: callId,
        driverId: driverId,
      },
    })
      .then((response) => {
        console.log("Dispatch Activated", response);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Dispatch Activated");
  };

  console.log("mapPage called");

  // if (driverLat && driverLng) getAndSetPolylineCoords();

  return (
    <div>
      <button onClick={getAndSetPolylineCoords}>경로 보기</button>

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
