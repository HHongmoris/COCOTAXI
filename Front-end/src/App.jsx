import React, { useEffect, useState } from "react";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { LineString, Circle as CircleGeometry, Point } from "ol/geom"; // Point를 가져와야 합니다
import { fromLonLat } from "ol/proj";
import { Style, Stroke, Fill, Icon } from "ol/style"; // Icon 클래스를 가져와야 합니다
import "ol/ol.css";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [circleFeature, setCircleFeature] = useState(null);
  const ORS_API_KEY =
    "5b3ce3597851110001cf624888240bdfef7d494bb8e36cbbd1683d77";

  const [circleCreated, setCircleCreated] = useState(false);
  const [markerCreated, setMarkerCreated] = useState(false);
  const [markerFeature, setMarkerFeature] = useState(null);

  useEffect(() => {
    if (!map) {
      const newMap = new Map({
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
      setMap(newMap);
    }
  }, [map]);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lonLat = [position.coords.longitude, position.coords.latitude];
        setCurrentLocation(lonLat);

        map.getView().animate({
          center: fromLonLat(lonLat),
          zoom: 12,
        });

        if (!circleCreated) {
          const source = new VectorSource();
          const layer = new VectorLayer({
            source: source,
          });

          map.addLayer(layer);

          const circleGeometry = new CircleGeometry(fromLonLat(lonLat), 6000);
          const circleStyle = new Style({
            fill: new Fill({
              color: "rgba(255, 255, 0, 0.2)",
            }),
            stroke: new Stroke({
              color: "yellow",
              width: 2,
            }),
          });

          const newCircleFeature = new Feature(circleGeometry);
          newCircleFeature.setStyle(circleStyle);
          source.addFeature(newCircleFeature);

          setCircleFeature(newCircleFeature);
          setCircleCreated(true);
        } else {
          const circleGeometry = new CircleGeometry(fromLonLat(lonLat), 6000);
          circleFeature.setGeometry(circleGeometry);
        }
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

    // Set the current location as the starting point
    const startCenter = fromLonLat(currentLocation);
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
          color: "yellow",
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

  // 랜덤 좌표를 생성하고 해당 좌표로 지도 이동
  const moveRandomLocation = () => {
    // 랜덤 경도와 위도 생성
    const randomLon = Math.random() * 360 - 180;
    const randomLat = Math.random() * 180 - 90;

    const randomLocation = [randomLon, randomLat];

    // 현재 위치 설정 및 지도 이동
    setCurrentLocation(randomLocation);
    map.getView().animate({
      center: fromLonLat(randomLocation),
      zoom: 12,
    });

    if (!markerCreated) {
      const source = new VectorSource();
      const layer = new VectorLayer({
        source: source,
      });

      map.addLayer(layer);

      // 마크(사진) 아이콘 스타일 설정
      const markerStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1], // 이미지 아이콘의 중심 아래에 정렬
          src: "data:image/png;base64,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", // 여기에 사용자가 설정한 이미지 URL을 넣으세요
          scale: 0.1, // 이미지 크기 조절
        }),
      });

      const newMarkerFeature = new Feature({
        geometry: new Point(fromLonLat(randomLocation)),
      });

      newMarkerFeature.setStyle(markerStyle);
      source.addFeature(newMarkerFeature);

      setMarkerFeature(newMarkerFeature);
      setMarkerCreated(true);
    } else {
      markerFeature.getGeometry().setCoordinates(fromLonLat(randomLocation));
    }
  };

  return (
    <div>
      <button onClick={getUserLocation}>Get Current Location</button>
      <button onClick={showRoute}>Show Route</button>
      <button onClick={moveRandomLocation}>Move to Random Location</button>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default MapComponent;
