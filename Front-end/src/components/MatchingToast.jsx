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
  }

  .Toastify__toast-icon {
    width: 22px;
    height: 22px;
  }
`;

function MatchingToast() {
  useEffect(() => {
    const showToastWithDelay = () => {
      // 랜덤한 숫자 및 차량 배치 정보 생성
      const passengerNumber = Math.floor(Math.random() * 100000) + 1;
      const vehicleNumber = Math.floor(Math.random() * 100000) + 1;
      const message = `${passengerNumber}번 승객이 ${vehicleNumber}번 차량에 배차 완료되었습니다.`;

      // 토스트 메시지 표시
      toast.info(<CustomToast>{message}</CustomToast>, {
        position: "top-left",
        autoClose: 3000,
        closeButton: false,
        hideProgressBar: true,
      });

      // 랜덤한 시간 간격 생성
      const delay = Math.floor(Math.random() * 4000) + 2000000;

      setTimeout(showToastWithDelay, delay);
    };

    showToastWithDelay(); // 초기 호출
  }, []);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default MatchingToast;
