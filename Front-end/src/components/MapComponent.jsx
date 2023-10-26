import React, { useEffect, useState } from "react";
import ClientList from "./ClientList";
import DispatchDriverList from "./DispatchDriverList";

const MapComponent = () => {
  const [map, setMap] = useState(null);

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
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        map,
      });

      const origin = { lat: 35.09443568187295, lng: 128.85421192146904 };
      const destination = { lat: 35.09052017750784, lng: 128.85331189172456 };

      const request = {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      directionsService.route(request, (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        }
      });
    }
  };

  return (
    <div>
      <button onClick={showRoute}>Show Route</button>
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
