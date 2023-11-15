import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDriverLatitude,
  setDriverLongitude,
  isDriverChanged,
  setDriverId,
  setCallId,
} from "../redux/actions";
import { useParams } from "react-router-dom";
import { useTable } from "react-table";
import styled from "styled-components";
import axios from "axios";

function DispatchCheck({ onClose, callId, driverId }) {
  const onClickDispatch = () => {
    axios
      .post("http://k9s101.p.ssafy.io:4000/api/dispatch", null, {
        params: {
          callId: callId,
          driverId: driverId,
        },
      })
      .then((response) => {
        console.log("Dispatch Activated", response);
        alert("강제 배차가 완료되었습니다.");
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("Dispatch Activated");
  };

  return (
    <div
      style={{
        height: "240px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          backgroundColor: "#fa7d0b",
          padding: "10px",
          textAlign: "center",
          color: "white",
          borderRadius: "10px 10px 0 0",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Dispatch Information
      </div>
      <div style={{ textAlign: "center", fontSize: "20px" }}>
        <p>Would you like to dispatch</p>
        <p>
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>
            Client {callId}
          </span>
          {"  "}
          in {"  "}
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>
            Driver {driverId}
          </span>
          ?
        </p>
      </div>

      <button
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          color: "white",
          backgroundColor: "#fa7d0b",
          cursor: "pointer",
          borderRadius: "0",
        }}
        onClick={onClickDispatch}
      >
        Dispatch
      </button>
      <button style={{ borderRadius: "0 0 10px 10px" }} onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}

export default DispatchCheck;
