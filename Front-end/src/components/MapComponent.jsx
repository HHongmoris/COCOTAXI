import React, { useEffect, useState, Component } from "react";
import { useParams } from "react-router-dom";
import ClientList from "./ClientList";
import DispatchDriverList from "./DispatchDriverList";
import MatchingToast from "./MatchingToast";
import axios from "axios";
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
  const [driverMarkers, setDriverMarkers] = useState([]);
  const [driverMarkerList, setDriverMarkerList] = useState([]);
  const [driverBoundaryList, setDriverBoundaryList] = useState([]);
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

      const getDriverinfo = async () => {
        const res = await axios.get(
          `http://k9s101.p.ssafy.io:4000/api/dispatch?callId=${callId}&driverId=${driverId}`
        );
        console.log("@@@@@@@@@@@@@@@@@2", res);
      };
      getDriverinfo();

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
    console.log("드라이버 위치 정보 수정  api 받아오는 곳 ", driverLocation);
  }, [coords, map, driverLocation]);

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

  // return new Promise((resolve, reject) => {
  //   setDriverBoundaryList([]);
  //   axios.get(`http://localhost:4000/api/dispatch/${callId}`)
  //     .then((res) => {
  //       const data = res.data;
  //       data.forEach((item) => {
  //         setDriverBoundaryList((prevList) => [...prevList, item.driverId]);
  //       });
  //       resolve("드라이버 목록을 가져오는 데 성공했습니다.");
  //     })
  //     .catch((error) => {
  //       reject(`드라이버 목록을 가져오는 데 실패했습니다. 오류: ${error.message}`);
  //     });
  // });
  // };

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

  // 마크 자동으로 움직이는거 sse 안되면 사용할 예정
  // useEffect(() => {
  //   const initialLat = 17.95747; // 초기 경도
  //   const initialLng = 102.64313; // 초기 위도
  //   const moveDistance = 0.00005; // 이동 거리 (조절 가능)

  //   // 초기 위치 생성
  //   if (map) {
  //     const initialPosition = new window.google.maps.LatLng(
  //       initialLat,
  //       initialLng
  //     );

  //     // const iconUrl = `https://sw-s3-bucket.s3.ap-northeast-2.amazonaws.com/${icontype}.png`;
  //     // const marker2 = new window.google.maps.Marker({
  //     //   position: positionInfo,
  //     //   map: mapInfo, // 마커를 지도에 추가
  //     //   icon: iconUrl,
  //     // });

  //     // 초기 마커 생성
  //     const initialMarker = new window.google.maps.Marker({
  //       position: initialPosition,
  //       icon: "https://ssafy-cocotaxi.s3.ap-northeast-2.amazonaws.com/car.png",
  //       map: map,
  //       // 다른 옵션들
  //     });
  //   }

  //   // 이동 방향 설정 (예: 오른쪽으로 이동)
  //   let latDirection = 1; // 양수는 위쪽으로 이동, 음수는 아래쪽으로 이동
  //   let lngDirection = -0.1; // 양수는 오른쪽으로 이동, 음수는 왼쪽으로 이동

  //   // 마커를 이동하는 함수
  //   const moveMarker = () => {
  //     const newLat =
  //       initialMarker.getPosition().lat() + latDirection * moveDistance;
  //     const newLng =
  //       initialMarker.getPosition().lng() + lngDirection * moveDistance;
  //     const newPosition = new window.google.maps.LatLng(newLat, newLng);

  //     // 마커의 위치를 업데이트
  //     initialMarker.setPosition(newPosition);
  //   };

  //   // 1초마다 새로운 위치로 이동
  //   const intervalId = setInterval(moveMarker, 1000); // 1초마다 이동 (조절 가능)

  //   // 컴포넌트가 언마운트되면 interval 정리
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [map]);

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

  // 드라이버 마크 지우기 함수
  const removeDriverMarker = (marker) => {
    if (marker) {
      // marker.setMap(null);
      removeMarker(marker);
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
        // 클릭 안된 마커들
        setMarkerToTransparent(marker.marker);
      } else if (marker.marker) {
        // 클릭된 마커들
        setMarkerToOpaque(marker.marker);
        dispatch(setClientLatitude(marker.position.lat));
        dispatch(setClientLongitude(marker.position.lng));
      }
    });
  };

  // 드라이버 마크 지우기
  const selectMarkerByDriverID = (driverId) => {
    driverMarkers.forEach((marker) => {
      if (marker.driverId !== driverId && marker.marker) {
        removeMarker(marker.marker);
      } else if (marker.marker) {
        // 클릭된 마커들
        setMarkerToOpaque(marker.marker);
        dispatch(setDriverLatitude(marker.position.lat));
        dispatch(setDriverLongitude(marker.position.lng));
      }
    });
  };

  const addDriverMarkerToMap = (driverId, marker, position) => {
    // 이전 마커 지우기
    driverMarkers.forEach((existingMarker) => {
      if (existingMarker.driverId === driverId && existingMarker.marker) {
        removeMarker(existingMarker.marker);
      }
    });

    // 새로운 마커 추가
    setDriverMarkerList((prevMarkers) => [
      ...prevMarkers,
      { driverId, marker, position },
    ]);
  };

  const addClientMarker = (positionInfo, mapInfo, callId, icontype) => {
    const marker1 = new window.google.maps.Marker({
      position: positionInfo,
      map: mapInfo, // 마커를 지도에 추가
      icon: `https://sw-s3-bucket.s3.ap-northeast-2.amazonaws.com/${icontype}.png`,
      animation: window.google.maps.Animation.DROP, // 바운스(drop) 애니메이션 활성화
    });
    marker1.addListener("click", () => {
      console.log("클릭문제다#!!$!#$!#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      const clickedCallId = callId; // 클릭한 마커의 callId 가져오기
      const latitude = positionInfo.lat;
      const longitude = positionInfo.lng;

      console.log(
        "마크 클릭한 위치 반환 : ",
        positionInfo.lat,
        positionInfo.lng
      );
      marker1.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker1.setAnimation(null);
      }, 3200); // 3초 후 중지 (원하는 시간으로 변경 가능)

      // 이제 clickedCallId를 활용하여 원하는 작업을 수행할 수 있음
      console.log("@@Clicked Marker's callId:", clickedCallId);
      dispatch(setCallId(clickedCallId));
      setClientMarkerSelect(() => true);
      dispatch(setClientLatitude(latitude));
      dispatch(setClientLongitude(longitude));
    });
    addClientMarkerToMap(callId, marker1, positionInfo);
    return marker1;
  };

  // infoWindow 함수
  let infoWindow2 = null;
  useEffect(() => {
    if (map) infoWindow2 = new window.google.maps.InfoWindow();
  }, [map]);
  if (driverMarker) {
    driverMarker.setMap(null);
  }

  function markerClickHandler(marker, contentString) {
    infoWindow2.close();
    infoWindow2.setContent(contentString);
    infoWindow2.open(map, marker);
  }

  const addDriverMarker = (positionInfo, mapInfo, icontype, driverId) => {
    // 이전 마크 제거
    driverMarkers.forEach((marker) => {
      if (marker.marker) {
        marker.marker.setMap(null);
        removeDriverMarker(marker2);
      }
    });

    const iconUrl = `https://sw-s3-bucket.s3.ap-northeast-2.amazonaws.com/${icontype}.png`;
    const marker2 = new window.google.maps.Marker({
      position: positionInfo,
      map: mapInfo, // 마커를 지도에 추가
      icon: iconUrl,
    });

    setDriverMarkers([{ driverId, marker: marker2 }]);

    // 정보 창 생성
    // 기사 정보 불러오는 함수
    let driverInfo;
    const getDriverInfo = async () => {
      const res = await axios.get(
        `http://k9s101.p.ssafy.io:4000/api/drivers/${driverId}`
        // `http://localhost:4000/api/drivers/${driverId}`
      );

      // 성공적으로 데이터를 불러왔을 때의 처리
      console.log("데이터:", res.data);
      // 정보 창 내용 설정
      driverInfo = `
        <div>
          <h2>${res.data.vehicleNo}</h2>
          <p>${res.data.grade}</p>
          <p>${res.data.driverName}</p>
          <p>☎ : ${res.data.driverPhoneNo}</p>
          <a href="https://voice.google.com/u/0/signup" target="_blank">
          <button style="width: 100%">📞</button>
          </a>
        </div>
        `;
    };

    // 드라이버 마크를 2초 후에 지우기
    setTimeout(() => {
      removeDriverMarker(marker2);
    }, 3000);

    getDriverInfo();
    // 드라이버 마커 클릭 이벤트 리스너 추가
    marker2.addListener("click", () => {
      const clickedDriverId = driverId;
      setDriverMarkerSelect(() => true);

      dispatch(setDriverId(clickedDriverId));
      dispatch(setDriverLatitude(positionInfo.lat));
      dispatch(setDriverLongitude(positionInfo.lng));
      // 클릭 시 정보 창 열도록 설정
      markerClickHandler(marker2, driverInfo);
      setTimeout(() => {
        marker2.setAnimation(null);
      }, 3000);
      marker2.setAnimation(window.google.maps.Animation.BOUNCE);
    });
    // 최초 1회만 호출되도록 확인하는 변수
    let isMarkerAdded = false;

    const addMarkerOnce = () => {
      if (!isMarkerAdded) {
        addDriverMarkerToMap(driverId, marker2, positionInfo);
        isMarkerAdded = true;
      }
    };

    // 1회 호출
    addMarkerOnce();

    return marker2;
  };
  // 6km 내의 driver 탐색
  useEffect(() => {
    const getDriversInBoundary = async () => {
      try {
        setDriverBoundaryList([]);
        const res = await axios.get(
          `http://k9s101.p.ssafy.io:4000/api/dispatch/${callId}`
        );
        const data = res.data;

        data.forEach((item) => {
          setDriverBoundaryList((prevList) => [...prevList, item.driverId]);
        });
      } catch (error) {
        console.error("데이터 가져오기 실패", error);
      }
    };
    if (map) getDriversInBoundary();
  }, [callId]);

  useEffect(() => {
    const selectDriverMarkerByCallId = () => {
      // 일단 다 투명하게
      driverMarkerList.forEach((driver) => driver.marker.setOpacity(0.2));
      driverBoundaryList.forEach((driverId) =>
        getDriverMarkerToOpaque(driverId)
      );
    };
    selectDriverMarkerByCallId();
  }, [driverBoundaryList]);

  const getDriverMarkerToOpaque = (driverId) => {
    driverMarkerList.forEach((driver) => {
      if (driver.driverId === driverId) driver.marker.setOpacity(1);
    });
  };

  useEffect(() => {
    if (isDriverLocationChanged || driverMarkerSelect)
      selectMarkerByDriverID(driverId);
  }, [driverId, isDriverLocationChanged]);

  const removeMarker = (marker) => {
    marker.setMap(null);
  };

  const setMarkerToTransparent = (marker) => {
    marker.setOpacity(0.3);
  };
  // marker의 투명도를 올리기
  const setMarkerToOpaque = (marker) => {
    marker.setOpacity(1);
  };

  // 여기서 마크를 만들고 없앤다
  useEffect(() => {
    console.log(isClientLocationChanged);
    if (isClientLocationChanged || clientMarkerSelect)
      selectMarkerByCallId(callId);
  }, [callId, isClientLocationChanged]);

  // 마킹
  useEffect(() => {
    //출발
    if (map) {
      if (clientMarker) removeMarker(clientMarker);
      setClientMarker(() =>
        addClientMarker({ lat: centerLat, lng: centerLng }, map, callId)
      );
      if (driverMarker) removeMarker(driverMarker);
      // setDriverMarker(() =>
      //   addDriverMarker({ lat: driverLat, lng: driverLng }, map, driverId)
      // );
    }
  }, [driverLat, driverLng, centerLng, centerLat, map]);

  // 기사 다 띄우기 (렌더링 막기 위해 useEffect 분리, 최초 렌더링때만 기사 호출)
  // 실제로 띄우는 부분
  useEffect(() => {
    const getDriverData = async () => {
      try {
        // SSE 연결
        const eventSource = new EventSource(
          "http://k9s101.p.ssafy.io:4000/api/drivers"
        );

        // 이전 드라이버 마커 삭제
        driverMarkerList.forEach((driver) => {
          if (driver.marker) {
            driver.marker.setMap(null);
          }
        });

        // SSE 이벤트 핸들러 등록
        eventSource.addEventListener("allDrivers", (res) => {
          const data = JSON.parse(res.data);

          if (data) {
            // console.log("@@@@@@@@@@@@@@seeㄷㄷㄷㄷ", data);
            data.forEach((driver) => {
              const driverPosition = {
                lat: driver.driverLatitude,
                lng: driver.driverLongitude,
              };
              const icontype = driver.vehicleType;
              const driverID = driver.driverId;

              // console.log("새로 바뀌는 데이터 값  @@@@@@@@@@@@@@@@@", driverID);
              addDriverMarker(driverPosition, map, icontype, driverID);
            });
          }
        });
      } catch (error) {
        console.error("drivers api error :", error);
      }
    };

    getDriverData();
  }, [map, driverId, driverLocation]);

  useEffect(() => {
    const getClientData = async () => {
      try {
        const response = await axios.get(
          "http://k9s101.p.ssafy.io:4000/api/callings"
          // "http://localhost:4000/api/callings"
        );
        const data = response.data;
        if (data) {
          data.forEach((clients) => {
            const clientPosition = {
              lat: clients.startPointLatitude,
              lng: clients.startPointLongitude,
            };
            const icontype = clients.lineColor;
            addClientMarker(clientPosition, map, clients.callId, icontype);
          });
        }
      } catch (error) {
        console.error("drivers api error :", error);
      }
    };

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

      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
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
            left: "10%",
            zIndex: 2,
          }}
        >
          <MatchingToast />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 15,
            left: "5%",
            width: "500px",
            background: "white",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            zIndex: isTableVisible ? 2 : -1,
            transform: isTableVisible ? "translateY(0)" : "translateY(100%)",
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
            right: "10%",
            width: "350px",
            background: "white",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
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
