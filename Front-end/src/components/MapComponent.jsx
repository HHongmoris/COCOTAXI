import React, { useEffect, useState, Component } from "react";
import ClientList from "./ClientList";
import DispatchDriverList from "./DispatchDriverList";
import axios from "axios";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [randomLocation, setRandomLocation] = useState(null);

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
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.092, lng: 128.854 },
        zoom: 12,
      });

      setMap(map);
    };

    loadGoogleMapsScript();
  }, []);

  const showRoute = () => {
    if (map) {
      // 출발지와 도착지 좌표 (부산역과 부산공항 예시)
      const startLocation = "8.676581,49.418204";
      const endLocation = "8.692803,49.409465";

      const apiKey = "5b3ce3597851110001cf624888240bdfef7d494bb8e36cbbd1683d77"; // ORS API 키로 교체

      // ORS API를 사용하여 경로 및 시간 가져오기
      axios
        .get(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startLocation}&end=${endLocation}`
        )
        .then((response) => {
          const data = response.data;
          const duration = data.features[0].properties.segments[0].duration;
          const routeCoordinates = data.features[0].geometry.coordinates;

          // 경로 좌표를 JSON 문자열로 변환
          const routeCoordinatesJSON = JSON.stringify(routeCoordinates);

          // 경로 좌표와 시간을 표시
          const message =
            "Route Coordinates: " +
            routeCoordinatesJSON +
            "\nDuration: " +
            duration;
          alert(message);
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
      drawCircle(lat, lng);
    }
  };

  const drawCircle = (lat, lng) => {
    if (map) {
      const circle = new window.google.maps.Circle({
        strokeColor: "#4158c1",
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: "#6c8fe8",
        fillOpacity: 0.35,
        map,
        center: { lat, lng },
        radius: 6000,
      });
    }
  };

  return (
    <div>
      <button onClick={showRoute}>Show Route</button>
      <button onClick={generateRandomLocation}>Generate Random Location</button>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 5 }}>{/* 빈 공간 (5) */}</div>
        <div style={{ flex: 50 }}>
          <ClientList />
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
