import React, { useEffect, useState } from "react";
import carIcon from "../assets/car-icon.png"; // 이미지 파일 경로

const MovingCarMap = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!map) {
      const mapOptions = {
        center: { lat: 40.7128, lng: -74.006 },
        zoom: 15,
      };
      const map = new window.google.maps.Map(
        document.getElementById("car-map"),
        mapOptions
      );

      const marker = new window.google.maps.Marker({
        position: { lat: 40.7128, lng: -74.006 },
        map: map,
        icon: carIcon, // 마커 아이콘 이미지
      });

      setMap(map);
      setMarker(marker);
    }
  }, [map]);

  useEffect(() => {
    if (marker) {
      // 초기 위치
      let currentPosition = { lat: 40.7128, lng: -74.006 };

      // 자동차 이동 로직 (예시: 위도, 경도 변화)
      const moveCar = () => {
        currentPosition.lat += 0.0001; // 위도 증가
        currentPosition.lng += 0.0001; // 경도 증가
        marker.setPosition(currentPosition);
        map.panTo(currentPosition); // 지도 이동
      };

      // 일정한 간격으로 자동차 이동
      const moveInterval = setInterval(moveCar, 1000); // 1초마다 이동

      return () => {
        clearInterval(moveInterval); // 컴포넌트 언마운트 시 setInterval 정리
      };
    }
  }, [marker, map]);

  return <div id="car-map" style={{ width: "100%", height: "500px" }}></div>;
};

export default MovingCarMap;
