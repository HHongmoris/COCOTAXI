import React, { useEffect, useState } from "react";
import ClientList from "./ClientList";
import DispatchDriverList from "./DispatchDriverList";
import axios from "axios";
import polyline from "@mapbox/polyline";
import { useCallback } from "react";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [centerLat, setCenterLat] = useState(35.092);
  const [centerLng, setCenterLng] = useState(128.854);
  const [circle, setCircle] = useState(null);
  const [openPage, setOpenPage] = useState(false);
  const [coords, setcoords] = useState(null);
  const [callId, setCallId] = useState(0);
  const [driverId, setDriverId] = useState(0);

  const updateCenterLat = (startPointLatitude) => {
    setCenterLat(startPointLatitude);
  };

  const updateCenterLng = (startPointLongitute) => {
    setCenterLng(startPointLongitute);
  };

  const updateCallId = (callId) => {
    setCallId(callId);
  }

  const updateDriverId = (driverId) => {
    setDriverId(driverId);
  }

  console.log("callId : " + callId );
  console.log("DId : " + driverId );

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
      const latLng = new window.google.maps.LatLng(centerLat, centerLng);
      map.setCenter(latLng);
      if (circle) {
        circle.setMap(null);
      }
      console.log(openPage);
      if (openPage) {
        drawCircle(centerLat, centerLng);
      } else {
        setOpenPage(true);
      }
    }
  }, [centerLat, centerLng, map]);


  // 시작하자마자 구글 맵 적용
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcpJXGOLDdWsqoSBrIUOZEDtSXNoGtTvw&libraries=geometry`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.onload = initMap;
      document.head.appendChild(googleMapsScript);
      console.log("googleAPI called")
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
  },[]);

  

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
    // 출발지 도착지가 들어가는 부분, OSM 에서 위 형식을 맞춰 넣어야함
    const startLocation = "129.084206,35.201727";
    const endLocation = "129.049873,35.171177";
    const apiKey = "5b3ce3597851110001cf624888240bdfef7d494bb8e36cbbd1683d77";

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
        });

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
  },[]);

  const onClickDispatch = () => {
    axios.post(`http://k9s101.p.ssafy.io:9000/api/dispatch/${callId}`,
      {
        "callId" : callId,
        "driverId" : driverId
      }
    )
    .then((응답) => {
      console.log("Dispatch Activated", 응답);
    })
    .catch((error) => {
      console.error(error);
    })
    console.log("Dispatch Activated")
  }
  


  console.log("mapPage called")

  return (
    <div>
      <button onClick={getAndSetPolylineCoords}>경로 보기</button>

      <div
        id="map"
        style={{ width: "100%", height: "400px", position: "relative" }}
      ></div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 5 }}>{/* 빈 공간 (5) */}</div>
        <div style={{ flex: 50 }}>
          <ClientList
            centerLat={centerLat}
            centerLng={centerLng}
            updateCallId={updateCallId}
            updateCenterLat={updateCenterLat}
            updateCenterLng={updateCenterLng}
          />
        </div>
        <div style={{ flex: 2 }}></div>
        <div style={{ flex: 40 }}>
          <DispatchDriverList
            updateDriverId={updateDriverId}
          />
          <div style={{display : "flex"}}>
          <button
          onClick = {onClickDispatch}
          >
            Dispatch
          </button>
          </div>
        </div>
        <div style={{ flex: 2 }}></div>
      </div>
    </div>
  );
};

export default MapComponent;
