import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const CustomToast = styled.div`
  .Toastify__toast {
    font-size: 16px;
    border-radius: 50px;
    padding: 16px 28px;
    color: #fff;
    background: rgba(107, 115, 135, 0.8);
    /* position: fixed;
    top: 5%;
    left: 10%; */
  }

  .Toastify__toast-icon {
    width: 22px;
    height: 22px;
  }
`;

function MatchingToast() {
  // const [toastCount, setToastCount] = useState(0);

  useEffect(() => {
    const showToastWithDelay = () => {
      // 랜덤한 숫자 및 차량 배치 정보 생성
      const passengerNumber = Math.floor(Math.random() * 10000) + 1;
      const vehicleNumber = Math.floor(Math.random() * 1000) + 1;
      const message = `The passenger ${passengerNumber} has been dispatched to vehicle ກສ${vehicleNumber}.`;

      // 토스트 메시지 표시
      toast.info(<CustomToast>{message}</CustomToast>, {
        position: "top-left",
        className: "custom-toast",
        autoClose: 4000,
        closeButton: false,
        hideProgressBar: true,
      });

      // 랜덤한 시간 간격 생성
      const delay = Math.floor(Math.random() * 6000) + 4000;
      console.log("delay", delay);

      setTimeout(showToastWithDelay, delay);
    };

    showToastWithDelay(); // 초기 호출
  }, []);

  return (
    <div>
      <ToastContainer
        style={{
          top: "8%",
          left: "1.5%",
        }}
      />
    </div>
  );
}

export default MatchingToast;
