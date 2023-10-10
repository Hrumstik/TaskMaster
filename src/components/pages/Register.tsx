import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../authentication/usersSlice";
import { useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";

interface BodyRequest {
  email: string;
  login: string;
  id: string;
}

const MainContainer = styled(Box)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 20vh;
  height 80vh;
  width: 30%;
  display: flex;
  flex-direction: column;
  `;

const SignUpButton = styled(Button)`
  width: 200px;
  align-self: center;
`;

const Register: React.FC = () => {
  const [loginValue, setLoginValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [failedRegister, setFailedRegister] = useState<string | boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const requestNewUser = async (body: BodyRequest) => {
    try {
      const config: AxiosRequestConfig = {
        method: "POST",
        url: `http://localhost:3001/users/`,
        data: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      };

      const response = await axios(config);

      return response.data;
    } catch (error: any) {
      setFailedRegister(error);
    }
  };

  const handleRegister = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(({ user }) => {
        if (user && user.email) {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: (user as any).accessToken,
            })
          );
          requestNewUser({
            email: user.email,
            login: loginValue,
            id: user.uid,
          });
          navigate("/");
        }
      })
      .catch((error) => setFailedRegister(error));
  };

  return (
    <MainContainer>
      <Typography
        sx={{ marginBottom: "20px", alignSelf: "center" }}
        variant="h1"
        fontSize={40}
      >
        Register a New Account
      </Typography>
      <TextField
        sx={{ marginBottom: "20px" }}
        label="Your login"
        value={loginValue}
        onChange={(event) => {
          setLoginValue(event.target.value);
        }}
      ></TextField>
      <TextField
        sx={{ marginBottom: "20px" }}
        label="Email adress"
        value={emailValue}
        onChange={(event) => {
          setEmailValue(event.target.value);
        }}
      ></TextField>
      <TextField
        sx={{ marginBottom: "20px" }}
        label="Password"
        type="password"
        value={passwordValue}
        onChange={(event) => {
          setPasswordValue(event.target.value);
        }}
      ></TextField>
      {failedRegister && (
        <Typography
          variant="h2"
          fontSize={20}
          sx={{ mb: "20px", color: "red" }}
        >
          Something went wrong
        </Typography>
      )}
      <SignUpButton
        variant="contained"
        fullWidth={false}
        onClick={handleRegister}
      >
        Sign Up
      </SignUpButton>
      <Typography variant="h2" fontSize={20} sx={{ mt: "40px" }}>
        Already have an account? <Link to="/Login">Then log in.</Link>
      </Typography>
    </MainContainer>
  );
};

export default Register;
