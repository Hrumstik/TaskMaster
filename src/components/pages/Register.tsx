import React, { useState } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import axios, { AxiosRequestConfig } from "axios";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { BodyRequest } from "../../types/types";
import { setUser } from "../authentication/usersSlice";

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
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateText = (text: string) => {
    return text.length > 3 && text.trim().length > 3;
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length > 5;
  };

  const requestNewUser = async (body: BodyRequest) => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: process.env.REACT_APP_USERS,
      data: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    };

    const response = await axios(config);
    return response.data;
  };

  const handleRegister = () => {
    let valid = true;
    if (!validateText(loginValue)) {
      setLoginError("Login must be longer than 3 characters");
      valid = false;
    } else {
      setLoginError("");
    }

    if (!validateEmail(emailValue)) {
      setEmailError("Invalid email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(passwordValue)) {
      setPasswordError("Password must be longer than 5 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

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
        error={Boolean(loginError)}
        helperText={loginError}
        sx={{ marginBottom: "20px" }}
        label="Your login"
        value={loginValue}
        onChange={(event) => {
          setLoginValue(event.target.value);
        }}
      ></TextField>
      <TextField
        error={Boolean(emailError)}
        helperText={emailError}
        sx={{ marginBottom: "20px" }}
        label="Email adress"
        value={emailValue}
        onChange={(event) => {
          setEmailValue(event.target.value);
        }}
      ></TextField>
      <TextField
        error={Boolean(passwordError)}
        helperText={passwordError}
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
