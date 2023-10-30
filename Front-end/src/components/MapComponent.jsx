import React, { useEffect, useState, Component } from "react";
import ClientList from "./ClientList";
import DispatchDriverList from "./DispatchDriverList";
import axios from "axios";
import polyline from "@mapbox/polyline";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [randomLocation, setRandomLocation] = useState(null);
  const [centerLat, setCenterLat] = useState(35.092);
  const [centerLng, setCenterLng] = useState(128.854);
  const [circle, setCircle] = useState(null);
  const [openPage, setOpenPage] = useState(false);

  const updateCenterLat = (startPointLatitude) => {
    setCenterLat(startPointLatitude);
  };

  const updateCenterLng = (startPointLongitute) => {
    setCenterLng(startPointLongitute);
  };

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcpJXGOLDdWsqoSBrIUOZEDtSXNoGtTvw&libraries=geometry`;
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
          zoom: 12,
        }
      );
      setMap(newMap);
    };

    loadGoogleMapsScript();
  }, []);

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

  const showRoute = () => {
    if (map) {
      // 출발지와 도착지 좌표
      const startLocation = "8.676581,49.418204";
      const endLocation = "8.692803,49.409465";

      //const apiKey = "5b3ce3597851110001cf624888240bdfef7d494bb8e36cbbd1683d77"; // ORS API 키로 교체

      // ORS API를 사용하여 경로 및 시간 가져오기
      axios
        .get
        //`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startLocation}&end=${endLocation}`
        ()
        .then((response) => {
          const data = response.data;
          const duration = data.features[0].properties.segments[0].duration;
          const routeCoordinates = data.features[0].geometry.coordinates;
          const distance = data.features[0].properties.segments[0].distance;

          // 경로 좌표를 JSON 문자열로 변환
          const routeCoordinatesJSON = JSON.stringify(routeCoordinates);

          // 경로 좌표와 시간을 표시
          const message =
            "Route Coordinates: " +
            routeCoordinatesJSON +
            "\nDuration: " +
            duration +
            " || Real Distance: " +
            distance +
            " meters"; // 이동 거리를 추가합니다.
          alert(message);

          console.log(message);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const generateRandomLocation = () => {
    const lat = 35.0 + Math.random() * 0.2; // Adjust the range as needed
    const lng = 128.7 + Math.random() * 0.2; // Adjust the range as needed
    setRandomLocation({ lat, lng });

    if (map) {
      const latLng = new window.google.maps.LatLng(lat, lng);
      map.setCenter(latLng);
      if (circle) {
        circle.setMap(null);
      }
      drawCircle(lat, lng);
    }
  };

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

  const getAndSetPolylineCoords = () => {
    const startLocation = "8.676581,49.418204";
    const endLocation = "8.692803,49.409465";
    const apiKey = "5b3ce3597851110001cf624888240bdfef7d494bb8e36cbbd1683d77"; // ORS API 키로 교체해야 합니다.

    // function parseCoordinatePair(pairString) {
    //   const [longitude, latitude] = pairString.split(",").map(Number);
    //   return { latitude, longitude };
    // }

    // // 주어진 legs 문자열을 파싱하여 배열에 좌표 객체를 추가
    // function parseLegs(legs) {
    //   const coordinates = legs.split(",").map(parseCoordinatePair);
    //   return coordinates;
    // }

    axios
      .get(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startLocation}&end=${endLocation}`
      )
      .then((response) => {
        const data = response.data;
        const routeCoordinatesJSON = data.features[0].geometry.coordinates;
        const legs = routeCoordinatesJSON;

        // const parsedCoordinates = parseLegs(legs);
        // console.log("변환값 " + parsedCoordinates);
        console.log("데이터를 불러오는 부분" + legs);
        // const poly = polyline.decode(legs);
        // console.log("폴리 적용" + poly);

        const coords = [];

        // 좌표
        // const decodedPolyline = legs;
        // decodedPolyline.forEach((coordinate) => {
        //   coords.push({
        //     latitude: coordinate[0],
        //     longitude: coordinate[1],
        //   });
        // });

        //디코딩해서 값 추출

        const decodedPolyline = legs;
        console.log(decodedPolyline);

        decodedPolyline.forEach((coordinate) => {
          coords.push({
            latitude: coordinate[0],
            longitude: coordinate[1],
          });
        });

        // setPolylineCoords(coords);

        console.log(coords);
        // 지도를 첫 번째 좌표로 이동
        if (coords.length > 0 && map) {
          const firstCoord = coords[0];
          const latLng = new window.google.maps.LatLng(
            firstCoord.latitude,
            firstCoord.longitude
          );
          map.setCenter(latLng);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (map) {
      // 다중 선을 그릴 좌표 배열 (예: 선1, 선2, 선3, ...)
      const multiPolylineCoordinates = [
        [
          { lat: 37.7749, lng: -122.4194 },
          { lat: 37.7759, lng: -122.4199 },
          { lat: 37.7769, lng: -122.4204 },
        ],
        // 다른 다중 선의 좌표
      ];

      // 다중 선을 그리기
      multiPolylineCoordinates.forEach((coordinates) => {
        const polyline = new window.google.maps.Polyline({
          path: coordinates,
          strokeColor: "#FF0000", // 선 색상 설정
          strokeOpacity: 1.0, // 선 불투명도 설정
          strokeWeight: 2, // 선 굵기 설정
        });
        polyline.setMap(map);
      });
    }
  }, [map]);

  return (
    <div>
      <button onClick={showRoute}>Show Route</button>
      <button onClick={generateRandomLocation}>Generate Random Location</button>
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
            updateCenterLat={updateCenterLat}
            updateCenterLng={updateCenterLng}
          />
        </div>
        <div style={{ flex: 2 }}>{/* 빈 공간 (2) */}</div>
        <div style={{ flex: 40 }}>
          <DispatchDriverList />
        </div>
        <div style={{ flex: 2 }}>{/* 빈 공간 (5) */}</div>
      </div>
    </div>
  );
};

export default MapComponent;
