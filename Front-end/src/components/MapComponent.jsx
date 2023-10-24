import styled from "styled-components";
import Openrouteservice from "openrouteservice-js";
import React, { useEffect, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import Feature from "ol/Feature";
import { LineString } from "ol/geom";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const ORS_API_KEY = "여기 API 넣으세요";

  useEffect(() => {
    // Initialize the map
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });
    document.body.style.display = "block";
    setMap(map);
  }, []);

  const showRoute = () => {
    // Define your origin and destination coordinates (in Lon/Lat)
    const origin = [35.09443568187295, 128.85421192146904];
    const destination = [35.09052017750784, 128.85331189172456];

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
      });
  };

  return (
    <div>
      <button onClick={showRoute}>Show Route</button>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default MapComponent;
