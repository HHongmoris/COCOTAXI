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
  // Dispatch 버튼 게이지
  const [progress, setProgress] = useState(100);
  const dispatch = useDispatch();

  const onClickDispatch = async () => {
    try {
      const response = await axios.post(
        "http://k9s101.p.ssafy.io:4000/api/dispatch",
        null,
        {
          params: {
            callId: callId,
            driverId: driverId,
          },
        }
      );

      console.log("Dispatch Activated", response);
      onClose(); // Dispatch가 완료된 후에 onClose 호출
    } catch (error) {
      console.error(error);
    }
    console.log("Dispatch Activated");
  };

  useEffect(() => {
    const startTime = performance.now();

    const animate = (time) => {
      const progressTime = time - startTime;
      const maxProgressTime = 5000;
      const progressPercentage = Math.min(progressTime / maxProgressTime, 1);

      setProgress(100 - progressPercentage * 100);

      if (progressPercentage < 1) {
        requestAnimationFrame(animate);
      } else {
        onClickDispatch();
        onClose();
      }
    };

    requestAnimationFrame(animate);

    return () => {
      setProgress(100);
    };
  }, []);

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
          fontWeight: "bold",
          background: `linear-gradient(to right, #269c42 ${progress}%, #fa7d0b ${progress}%)`,
          cursor: "pointer",
          borderRadius: "0",
          transition: "background-color 0.1s ease",
        }}
        onClick={onClickDispatch}
      >
        Dispatch
      </button>
      <button
        style={{
          borderRadius: "0 0 10px 10px",
          color: "red",
          fontWeight: "bold",
        }}
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
}

export default DispatchCheck;
