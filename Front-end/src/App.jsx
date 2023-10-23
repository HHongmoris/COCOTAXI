import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import axios from "axios";

class RoutePlanner extends Component {
  constructor() {
    super();
    this.state = {
      startLocation: "",
      endLocation: "",
      route: null,
      duration: null,
    };
  }

  handleStartLocationChange = (event) => {
    this.setState({ startLocation: event.target.value });
  };

  handleEndLocationChange = (event) => {
    this.setState({ endLocation: event.target.value });
  };

  calculateRoute = () => {
    const { startLocation, endLocation } = this.state;

    const apiKey = "5b3ce3597851110001cf624888240bdfef7d494bb8e36cbbd1683d77";
    const apiUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startLocation}&end=${endLocation}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const route = response.data.features[0].geometry.coordinates;
        const duration =
          response.data.features[0].properties.segments[0].duration;

        this.setState({ route, duration });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { route } = this.state;
    const routeCoordinates = route
      ? route.map((coord) => [coord[1], coord[0]])
      : [];

    return (
      <div>
        <input
          type="text"
          placeholder="Start Location"
          value={this.state.startLocation}
          onChange={this.handleStartLocationChange}
        />
        <input
          type="text"
          placeholder="End Location"
          value={this.state.endLocation}
          onChange={this.handleEndLocationChange}
        />
        <button onClick={this.calculateRoute}>Calculate Route</button>

        {route && (
          <div>
            <div>Estimated Duration: {this.state.duration} seconds</div>
            <div>Route Coordinates: {JSON.stringify(route)}</div>
          </div>
        )}

        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            minZoom={0}
            maxZoom={19}
          />
          {/* 경로를 표시하는 Polyline 추가 */}
          <Polyline
            pathOptions={{ color: "red", weight: 5 }}
            positions={routeCoordinates}
          />

          {/* 마커 추가 */}
          <Marker position={[51.5, -0.09]}>
            <Popup>
              A pretty CSS popup.
              <br />
              Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default RoutePlanner;
