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
          <InputLabel>아이디</InputLabel>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputContainer>

        <InputContainer>
          <InputLabel>비밀번호</InputLabel>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>

        <button type="submit">Login</button>
      </LoginForm>
    </LoginContainer>
  );
}

export default AdminLogin;
