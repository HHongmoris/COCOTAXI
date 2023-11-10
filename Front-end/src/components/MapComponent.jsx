import React, { useEffect, useState, Component } from "react";
import { useParams } from "react-router-dom";
import ClientList from "./ClientList";
import DispatchDriverList from "./DispatchDriverList";
import MatchingToast from "./MatchingToast";
import axios from "axios";
import polyline from "@mapbox/polyline";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDriverLatitude,
  setDriverLongitude,
  isDriverChanged,
  setClientLatitude,
  setClientLongitude,
  isClientChanged,
  setCallId,
  setDriverId,
} from "../redux/actions";

import CoCoGreen from "../assets/CoCoGreen.png";
import CoCoRed from "../assets/CoCoRed.png";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [circle, setCircle] = useState(null);
  const [openPage, setOpenPage] = useState(false);
  const [coords, setCoords] = useState(null);
  const [clientMarker, setClientMarker] = useState(null);
  const [driverMarker, setDriverMarker] = useState(null);
  const [polylineData, setPolylineData] = useState(null);
  const [polyline2, setPolyline2] = useState(null);
  const [infowindow2, setInfowindow2] = useState(null);
  const [clientMarkers, setClientMarkers] = useState([]);
  const [driverMarkerList, setDriverMarkerList] = useState([]);
  const [clientMarkerSelect, setClientMarkerSelect] = useState(false);
  const [driverMarkerSelect, setDriverMarkerSelect] = useState(false);
  const [isTableVisible, setIsTableVisible] = useState(false);



  // Redux에서 값 가져오기
  const dispatch = useDispatch();
  const centerLat = useSelector((state) => state.client_latitude);
  const centerLng = useSelector((state) => state.client_longitude);
  const driverLat = useSelector((state) => state.driver_latitude);
  const driverLng = useSelector((state) => state.driver_longitude);
  const callId = useSelector((state) => state.call_id);
  const driverId = useSelector((state) => state.driver_id);
  const driverLocation = `${driverLat},${driverLng}`;
  const clientLocation = `${centerLat},${centerLng}`;
  const isDriverLocationChanged = useSelector(
    (state) => state.is_driver_location_changed
  );
  const isClientLocationChanged = useSelector(
    (state) => state.is_client_location_changed
  );

  console.log("callId : " + callId);
  console.log("DId : " + driverId);

  // requestAnimationFrame 좌표 계산
  const animateToLocation = (start, end, duration) => {
    const startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        const newLat = start.lat() + (end.lat() - start.lat()) * progress;
        const newLng = start.lng() + (end.lng() - start.lng()) * progress;

        map.setCenter(new window.google.maps.LatLng(newLat, newLng));
        requestAnimationFrame(animate);
      } else {
        map.setCenter(end); // 애니메이션이 끝나면 목표 좌표로 설정
      }
    };

    animate();
  };

  // 마크 사진 적용
  useEffect(() => {
    if (map && coords && coords.length > 0) {
      if (polylineData) polylineData.setMap(null);
      if (polyline2) polyline2.setMap(null);
      console.log(isClientLocationChanged);
      // if (isClientLocationChanged) {
      //   polylineData.setMap(null);
      //   polyline2.setMap(null);
      //   dispatch(isClientChanged(false));
      // }

      if (infowindow2) infowindow2.setMap(null);

      const midIndex = Math.floor(coords.length / 2);
      const midCoord = coords[midIndex];

      // 정보 창 내용 설정
      const contentString = `
      <div style="max-height: 58px; overflow: auto;">
        <h2 style="font-size: 12px;">3KM</h2>
        <p style="font-size: 10px;">6min.</p>
      </div>
    `;

      // 정보 창 생성
      const infoWindow2 = new window.google.maps.InfoWindow({
        content: contentString,
      });

      // 폴리라인의 중간 지점 위치 설정
      const polylineMidpoint = new window.google.maps.LatLng(
        midCoord.lat,
        midCoord.lng
      );
      infoWindow2.setPosition(polylineMidpoint); // 정보 창을 중간 지점으로
      infoWindow2.open(map);

      const multiPolylineCoordinates = [];
      multiPolylineCoordinates.push(coords);
      console.log(multiPolylineCoordinates);

      function animateCircle(polyline2) {
        const path = polyline2.getPath();

        const reversedPath = new window.google.maps.MVCArray(); // 뒤집힌 경로를 저장할 새로운 배열

        for (let i = path.getLength() - 1; i >= 0; i--) {
          reversedPath.push(path.getAt(i)); // 경로를 거꾸로 뒤집어 새 배열에 추가
        }

        polyline2.setPath(reversedPath); // 뒤집힌 경로를 폴리라인에 설정

        let count = 3000;

        window.setInterval(() => {
          count = (count - 1 + 3000) % 3000;
          const icons = polyline2.get("icons");
          icons[0].offset = (3000 - count) / 8 + "%"; // 방향을 반대로 변경
          polyline2.set("icons", icons);
        }, 20);
      }

      const lineSymbol = {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10,
        fillColor: "#3B1877", // 채우기 색상 설정
        fillOpacity: 1,
        strokeWeight: 1, // 테두리 두께 설정
        strokeColor: "#1018", // 테두리 색상 설정
        strokeOpacity: 1.0, // 테두리 불투명도 설정
      };

      multiPolylineCoordinates.forEach((coordinates) => {
        const polyline = new window.google.maps.Polyline({
          path: coordinates,
          strokeColor: "#FF5500",
          strokeOpacity: 1.0,
          strokeWeight: 10,
        });

        const polyline2 = new window.google.maps.Polyline({
          path: coordinates,
          icons: [
            {
              icon: lineSymbol,
              offset: "100%",
            },
            5,
          ],
          strokeColor: "#FFFFFF",
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: map,
        });
        polyline.setMap(map);
        removeCircle();
        animateCircle(polyline2);
        setPolylineData(() => polyline);
        setPolyline2(() => polyline2);
      });
    }
  }, [coords, map, driverLocation]);

  // centerLat 또는 centerLng 값이 변경될 때 애니메이션 적용
  useEffect(() => {
    if (map) {
      const latLng = new window.google.maps.LatLng(centerLat, centerLng);
      const currentCenter = map.getCenter();

      // 애니메이션 기간 (밀리초)
      const animationDuration = 500;

      // 중간 좌표로 애니메이션 적용
      animateToLocation(currentCenter, latLng, animationDuration);
    }
  }, [centerLat, centerLng, map]);

  useEffect(() => {
    if (map) {
      const latLng = new window.google.maps.LatLng(centerLat, centerLng);
      map.setCenter(latLng);
      if (circle) {
        circle.setMap(null);
      }
      if (openPage) {
        drawCircle(centerLat, centerLng);
      } else {
        setOpenPage(true);
      }
    }

    getAndSetPolylineCoords();
  }, [centerLat, centerLng, driverId, map]);

  // 시작하자마자 구글 맵 적용
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcpJXGOLDdWsqoSBrIUOZEDtSXNoGtTvw&libraries=geometry&language=en`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.onload = initMap;
      document.head.appendChild(googleMapsScript);
    };

    const initMap = () => {
      const newMap = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat: centerLat, lng: centerLng },
          zoom: 13,
        }
      );
      // 교통 레이어 추가
      const trafficLayer = new window.google.maps.TrafficLayer();
      trafficLayer.setMap(newMap);

      setMap(newMap);
    };

    loadGoogleMapsScript();
  }, []);

  // 원 그리기
  const drawCircle = (lat, lng) => {
    if (map) {
      const newCircle = new window.google.maps.Circle({
        strokeColor: "#e9c026",
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: "#faf5c7",
        fillOpacity: 0.2,
        map,
        center: { lat, lng },
        radius: 6000,
      });
      setCircle(newCircle);
    }
  };

  // 원 지우기
  const removeCircle = () => {
    if (circle) {
      circle.setMap(null);
      setCircle(null);
    }
  };

  // 클라이언트 마커와 callId를 매핑하는 함수
  const addClientMarkerToMap = (callId, marker, position) => {
    setClientMarkers((prevMarkers) => [
      ...prevMarkers,
      { callId, marker, position },
    ]);
  };
  const selectMarkerByCallId = (callId) => {
    clientMarkers.forEach((marker) => {
      if (marker.callId !== callId && marker.marker) {
        marker.marker.setVisible(false);
      } else if (marker.marker) {
        marker.marker.setVisible(true);
        dispatch(setClientLatitude(marker.position.lat));
        dispatch(setClientLongitude(marker.position.lng));
      }
    });
  };

  // 드라이버 마커와 callId를 매핑하는 함수
  // const addDriverMarkerToMap = (driverId, marker) => {
  //   setDriverMarkerList((prevMarkers) => [
  //     ...prevMarkers,
  //     { driverId, marker }
  //   ]);
  // };

  // const selectMarkerByCallId = (driverId) => {
  //   driverMarkerList.forEach((marker) => {
  //     if (marker.driverId === driverId && marker.marker) {
  //       marker.driverInfo
  //     } 
  //   });
  // };

  const addClientMarker = (positionInfo, mapInfo, callId) => {
    const marker1 = new window.google.maps.Marker({
      position: positionInfo,
      map: mapInfo, // 마커를 지도에 추가
      icon: "https://ssafy-cocotaxi.s3.ap-northeast-2.amazonaws.com/client.png",
      animation: window.google.maps.Animation.DROP, // 바운스(drop) 애니메이션 활성화
    });

    marker1.addListener("click", () => {
      const clickedCallId = callId; // 클릭한 마커의 callId 가져오기
      const latitude = positionInfo.lat;
      const longitude = positionInfo.lng;
      console.log(
        "마크 클릭한 위치 반환 : ",
        positionInfo.lat,
        positionInfo.lng
      );
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 3000); // 3초 후 중지 (원하는 시간으로 변경 가능)

      // 이제 clickedCallId를 활용하여 원하는 작업을 수행할 수 있음
      console.log("Clicked Marker's callId:", clickedCallId);
      dispatch(setCallId(clickedCallId));
      setClientMarkerSelect(() => true);
      dispatch(setClientLatitude(latitude));
      dispatch(setClientLongitude(longitude));
    });

    addClientMarkerToMap(callId, marker1, positionInfo);
    return marker1;
  };

  }
  

  // infoWindow 함수
  let infoWindow2 = null;
  useEffect(() => {
    if (map) infoWindow2 = new window.google.maps.InfoWindow();
  }, [map]);

  function markerClickHandler(marker, contentString) {
    infoWindow2.close();
    infoWindow2.setContent(contentString);
    infoWindow2.open(map, marker);
  }

  const addDriverMarker = (positionInfo, mapInfo, icontype, driverId) => {

    const iconUrl = `https://sw-s3-bucket.s3.ap-northeast-2.amazonaws.com/${icontype}.png`;
    const marker2 = new window.google.maps.Marker({
      position: positionInfo,
      map: mapInfo, // 마커를 지도에 추가
      icon: iconUrl,
    });
    // 정보 창 생성
    // 기사 정보 불러오는 함수

    let driverInfo;
    const fetchData = async () => {
        const res = await axios.get(`http://k9s101.p.ssafy.io:4000/api/drivers/${driverId}`);
        
        // 성공적으로 데이터를 불러왔을 때의 처리
        // console.log('데이터:', res.data);
        // 정보 창 내용 설정
        driverInfo =`
        <div>
          <h2>${res.data.vehicleNo}</h2>
          <p>${res.data.grade}</p>
          <p>${res.data.driverName}</p>
          <p>☎ : ${res.data.driverPhoneNo}</p>
          <a href="https://voice.google.com/u/0/signup" target="_blank">
          <button style="width: 100%">📞</button>
          </a>
        </div>
        `
      
    };
  
  fetchData()
    // 드라이버 마커 클릭 이벤트 리스너 추가
    marker2.addListener("click", () => {
      const clickedDriverId = driverId;
      setDriverMarkerSelect(() => true);
      dispatch(setDriverId(clickedDriverId));
      // 클릭 시 정보 창 열도록 설정
      markerClickHandler(marker2, driverInfo);
    });
    
    return marker2;
  };

  // 여기서 마크를 만들고 없앤다
  useEffect(()=>{
    console.log(isClientLocationChanged)
    if(isClientLocationChanged || clientMarkerSelect)
    selectMarkerByCallId(callId);
    // if(isDriverLocationChanged || driverMarkerSelect)
    // selectMarkerByDriverId(driverId)
  },[callId, isClientLocationChanged])

  const removeMarker = (marker) => {
    marker.setMap(marker);
    marker;
  };
  // 마킹
  useEffect(() => {
    //출발
    if (map) {
      if (clientMarker) removeMarker(clientMarker);
      if (driverMarker) removeMarker(driverMarker);
      setClientMarker(() =>
        addClientMarker({ lat: centerLat, lng: centerLng }, map, callId)
      );
      setDriverMarker(() =>
        addDriverMarker({ lat: driverLat, lng: driverLng }, map, driverId)
      );
      
    }
  }, [driverLat, driverLng, centerLng, centerLat, map]);

  // 기사 다 띄우기 (렌더링 막기 위해 useEffect 분리, 최초 렌더링때만 기사 호출)
  // 실제로 띄우는 부분
  useEffect(() => {
    const getDriverData = async () => {
      try {
        const response = await axios.get(
          "http://k9s101.p.ssafy.io:4000/api/drivers"
        );
        const data = response.data;
        if (data) {
          data.forEach((driver) => {
            const driverPosition = {
              lat: driver.driverLatitude,
              lng: driver.driverLongitude,
            };
            const icontype = driver.vehicleType;
            addDriverMarker(driverPosition, map, icontype, driver.driverId);
          });
        }
      } catch (error) {
        console.error("drivers api error :", error);
      }
    };

    const getClientData = async () => {
      try {
        const response = await axios.get(
          "http://k9s101.p.ssafy.io:4000/api/callings"
        );
        const data = response.data;
        console.log("@@@@@@@@@@@@@@@@@@@drivers data : ", data);
        if (data) {
          data.forEach((clients) => {
            const clientPosition = {
              lat: clients.startPointLatitude,
              lng: clients.startPointLongitude,
            };
            // console.log(clients, clientPosition);
            addClientMarker(clientPosition, map, clients.callId);
          });
        }
      } catch (error) {
        console.error("drivers api error :", error);
      }
    };
    getDriverData();
    getClientData();
  }, [map]);

  const getAndSetPolylineCoords = useCallback(() => {
    // 출발지 도착지가 들어가는 부분, OSM 에서 위 형식을 맞춰 넣어야함 / 형식 추가
    const startLocation = `${centerLng},${centerLat}`; // 손님의 시작부분
    const endLocation = `${driverLng},${driverLat}`; // 드라이버 위치
    console.log(startLocation + "그리고" + endLocation);
    const apiKey = "5b3ce3597851110001cf62484d2ea0dd89de4bdf9db543da46626b16";

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
        setCoords(coords);

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

  console.log("mapPage called");

  // if (driverLat && driverLng) getAndSetPolylineCoords();

  // 테이블 애니메이션
  const toggleTable = () => {
    setIsTableVisible(!isTableVisible);
  };



  return (
    <div>
      <div style={{ position: "absolute", top: "5%", right: "5%", zIndex: 2 }}>
        <img
          src={isTableVisible ? CoCoGreen : CoCoRed}
          alt={isTableVisible ? "CoCoGreen" : "CoCoRed"}
          onClick={toggleTable}
          style={{ cursor: "pointer", width: "70px", height: "70px" }}
        />
      </div>

      <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
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
            zIndex: 2,
          }}
        >
          <MatchingToast />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 15,
            left: 30,
            width: "500px",
            background: "white",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            zIndex: isTableVisible ? 2 : -1,
            transform: isTableVisible ? "translateY(0)" : "transLateY(100%)",
            opacity: isTableVisible ? 1 : 0,
            transition: "transform 0.3s, opacity 0.3s",
          }}
        >
          {/* 클라이언트 리스트 컴포넌트 */}
          <ClientList />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 15,
            right: 60,
            width: "350px",
            background: "white",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            zIndex: isTableVisible ? 2 : -1,
            transform: isTableVisible ? "translateY(0)" : "transLateY(100%)",
            opacity: isTableVisible ? 1 : 0,
            transition: "transform 0.3s, opacity 0.3s",
          }}
        >
          <DispatchDriverList />
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
