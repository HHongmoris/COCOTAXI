import React, { useEffect, useState } from "react";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { LineString, Circle as CircleGeometry } from "ol/geom";
import { fromLonLat, toLonLat } from "ol/proj";
import { Style, Stroke, Fill } from "ol/style";
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
        center: fromLonLat([3.886, 51.007]),
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

        map.getView().animate({
          center: fromLonLat(lonLat),
          zoom: 12,
        });

        // Create a source and layer for the yellow circle
        const source = new VectorSource();
        const layer = new VectorLayer({
          source: source,
        });

        map.addLayer(layer);

        // Create a yellow circle geometry around the user's location
        const circleGeometry = new CircleGeometry(fromLonLat(lonLat), 6000); // 6km radius

        // Style for the circle
        const circleStyle = new Style({
          fill: new Fill({
            color: "rgba(255, 255, 0, 0.2)", // Yellow color with 60% opacity
          }),
          stroke: new Stroke({
            color: "yellow",
            width: 2,
          }),
        });

        // Add the circle feature to the source with the defined style
        const circleFeature = new Feature(circleGeometry);
        circleFeature.setStyle(circleStyle);
        source.addFeature(circleFeature);
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

    const origin = currentLocation;
    const destination = [8.692803, 49.409465];

    const startCenter = fromLonLat(origin);
    const endCenter = fromLonLat(destination);

    const extent = [
      Math.min(startCenter[0], endCenter[0]),
      Math.min(startCenter[1], endCenter[1]),
      Math.max(startCenter[0], endCenter[0]),
      Math.max(startCenter[1], endCenter[1]),
    ];

    map.getView().fit(extent, { padding: [20, 20, 20, 20] });
    map.getView().setZoom(map.getView().getZoom() + 12);

    const source = new VectorSource();
    const layer = new VectorLayer({
      source: source,
      style: new Style({
        stroke: new Stroke({
          color: "blue",
          width: 4,
        }),
      }),
    });

    map.addLayer(layer);

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
      <button onClick={getUserLocation}>Get Current Location</button>
      <button onClick={showRoute}>Show Route</button>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default MapComponent;
