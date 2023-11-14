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
    <div>
      <p>
        Would you like to dispatch Client {callId} in Driver {driverId}?
      </p>
      <button onClick={onClose}>Close</button>
      <button onClick={onClickDispatch}>Dispatch</button>
    </div>
  );
}

export default DispatchCheck;
