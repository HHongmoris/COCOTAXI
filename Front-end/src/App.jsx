import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { LineString } from "ol/geom";
import { fromLonLat, toLonLat } from "ol/proj";
import "ol/ol.css";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const ORS_API_KEY = "YOUR_ORS_API_KEY";

  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([3.886, 51.007]), // 초기 지도 중심 좌표 설정
        zoom: 13,
      }),
    });

    setMap(map);
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lonLat = [position.coords.longitude, position.coords.latitude];
        setCurrentLocation(lonLat);

        // Zoom to user's location
        map.getView().animate({
          center: fromLonLat(lonLat),
          zoom: 15,
        });
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const showRoute = () => {
    if (!currentLocation) {
      alert("Please get your current location first.");
      return;
    }

    // Define your origin and destination coordinates (in Lon/Lat)
    const origin = currentLocation;
    const destination = [8.692803, 49.409465];

    // Create a source for the route geometry
    const source = new VectorSource();
    const layer = new VectorLayer({
      source: source,
    });

    map.addLayer(layer);

    // Request the route from OpenRouteService
    fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${origin}&end=${destination}`
    )
      .then((response) => response.json())
      .then((data) => {
        const coordinates = data.features[0].geometry.coordinates;
        const route = new LineString(coordinates).transform(
          "EPSG:4326",
          "EPSG:3857"
        );
        const feature = new Feature({
          geometry: route,
        });
        source.addFeature(feature);

        // Zoom to the extent of the route
        const extent = route.getExtent();
        map.getView().fit(extent, { padding: [20, 20, 20, 20] });
      });
  };

  return (
    <div>
      <button onClick={getUserLocation}>Get Current Location</button>
      <button onClick={showRoute}>Show Route</button>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default MapComponent;
