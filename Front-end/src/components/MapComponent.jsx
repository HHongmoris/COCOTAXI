import React, { useEffect, useState, Component } from "react";
import ClientList from "./ClientList";
import DispatchDriverList from "./DispatchDriverList";
import axios from "axios";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [randomLocation, setRandomLocation] = useState(null);
  const [centerLat, setCenterLat] = useState(35.092);
  const [centerLng, setCenterLng] = useState(128.854);

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
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: centerLat, lng: centerLng },
        zoom: 14,
      });
      console.log("centerLat", centerLat);
      console.log("centerLng", centerLng);
      setMap(map);
      drawCircle(centerLat, centerLng);
    };

    loadGoogleMapsScript();
  }, [centerLat, centerLng]);

  const showRoute = () => {
    if (map) {
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
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const generateRandomLocation = () => {
    const lat = 35.0 + Math.random() * 0.2;
    const lng = 128.7 + Math.random() * 0.2;
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
        strokeOpacity: 0.99,
        strokeWeight: 2,
        fillColor: "#6c8fe8",
        fillOpacity: 0.2,
        map,
        center: { lat, lng },
        radius: 6000,
      });
    }
  };

  const markers = [
    { lat: 35.092, lng: 128.854 },
    { lat: 35.093, lng: 128.864 },
    { lat: 35.085, lng: 128.859 },
    { lat: 35.088, lng: 128.839 },
  ];

  markers.forEach((markerCoords, index) => {
    const marker = new window.google.maps.Marker({
      position: markerCoords,
      map,
      title: `Marker ${index + 1}`, // 마커 타이틀
    });

    // 원 그리기
    const circle = new window.google.maps.Circle({
      strokeColor: "#4158c1",
      strokeOpacity: 0.99,
      strokeWeight: 2,
      fillColor: "#6c8fe8",
      fillOpacity: 0.1,
      map,
      center: { lat: 35.092, lng: 128.854 },
      radius: 6000,
    });
  });
  return (
    <div>
      <button onClick={showRoute}>Show Route</button>
      <button onClick={generateRandomLocation}>Generate Random Location</button>
      <div
        id="map"
        style={{ width: "100%", height: "400px", position: "relative" }}
      ></div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 5 }}></div>
        <div style={{ flex: 50 }}>
          <ClientList
            centerLat={centerLat}
            centerLng={centerLng}
            updateCenterLat={updateCenterLat}
            updateCenterLng={updateCenterLng}
            map={map}
          />
        </div>
        <div style={{ flex: 2 }}></div>
        <div style={{ flex: 40 }}>
          <DispatchDriverList />
        </div>
        <div style={{ flex: 2 }}></div>
      </div>
    </div>
  );
};

export default MapComponent;
