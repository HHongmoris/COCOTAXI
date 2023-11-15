import React from "react";
import styled from "styled-components";

const ManualInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 250px;
  height: 350px;
  padding: 10px;
  border: 1px solid;
  border-radius: 8px;
  background-color: #edeaea;

  h3,
  h5,
  p {
    margin: 0;
  }
`;

function ManualInformation() {
  return (
    <ManualInformationContainer>
      <h3 style={{ fontWeight: "bold" }}> Car & TokTok </h3>
      <p>
        <span style={{ fontWeight: "bold" }}>White</span> : Off duty
      </p>
      <p>
        <span style={{ color: "green", fontWeight: "bold" }}>Green</span> :
        Corporate Available
      </p>
      <p>
        <span style={{ color: "#d19c0b", fontWeight: "bold" }}>Yellow</span> :
        General Available
      </p>
      <p>
        <span style={{ color: "blue", fontWeight: "bold" }}>Blue</span> :
        Boarding
      </p>
      <h3 style={{ fontWeight: "bold" }}>Client</h3>
      <p>
        <span style={{ color: "green", fontWeight: "bold" }}>Green</span> : Less
        200,000 LAK
      </p>
      <p>
        <span style={{ color: "#d19c0b", fontWeight: "bold" }}>Yellow</span> :
        200,0000 - 500,000 LAK
      </p>
      <p>
        <span style={{ color: "red", fontWeight: "bold" }}>Red</span> : Over
        500,000 LAK
      </p>
      <h5>※ Prices change depending on traffic conditions</h5>
    </ManualInformationContainer>
  );
}

export default ManualInformation;
