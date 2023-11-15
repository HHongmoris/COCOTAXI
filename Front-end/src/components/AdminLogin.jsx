import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import kokkokexpress from "../assets/kokkokexpress.png";

const LoginContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputLabel = styled.label`
  width: 80px;
`;

const LogoImage = styled.img`
  margin-bottom: 30px;
  max-width: 70%;
  display: block;
  margin: 20px auto;
`;

const LoginButton = styled.button`
  width: 200px;
  border: 1px solid;
  border-radius: 8px;
`;

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const loginSuccess = true;

    if (loginSuccess) {
      navigate("/admin");
    } else {
      alert("Login failed. Please check your username and password.");
    }
  };

  return (
    <LoginContainer>
      <LogoImage src={kokkokexpress} alt="kokkokexpress" />

      <LoginForm onSubmit={handleLogin}>
        <InputContainer>
          <InputLabel style={{ fontWeight: "bold" }}>ID</InputLabel>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <InputLabel style={{ fontWeight: "bold" }}>Password</InputLabel>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>

        <LoginButton
          type="submit"
          style={{ marginTop: "10px", fontWeight: "bold" }}
        >
          Login
        </LoginButton>
      </LoginForm>
    </LoginContainer>
  );
}

export default AdminLogin;
