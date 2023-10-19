import React, { useState } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const SignInButton = styled(Button)`
  width: 200px;
  align-self: center;
`;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [failedLogin, setFailedLogin] = useState(false);

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(({ user }) => {
        if (user && user.email) {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: (user as any).accessToken,
            })
          );
          navigate("/");
        }
      })
      .catch((error) => setFailedLogin(error));
  };

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <MainContainer>
      <Typography
        sx={{ marginBottom: "20px", alignSelf: "center" }}
        variant="h1"
        fontSize={40}
      >
        Please log in
      </Typography>
      <TextField
        sx={{ marginBottom: "20px" }}
        label="Email adress"
        value={emailValue}
        onChange={(event) => {
          setEmailValue(event.target.value);
        }}
      />
      <TextField
        sx={{ marginBottom: "20px" }}
        label="Password"
        type="password"
        value={passwordValue}
        onChange={(event) => {
          setPasswordValue(event.target.value);
        }}
      ></TextField>
      {failedLogin && (
        <Typography
          variant="h2"
          fontSize={20}
          sx={{ mb: "20px", color: "red" }}
        >
          Something went wrong
        </Typography>
      )}
      <SignInButton variant="contained" fullWidth={false} onClick={handleLogin}>
        Sign In
      </SignInButton>
      <Typography variant="h2" fontSize={20} sx={{ mt: "40px" }}>
        <Link to="/Register">Create an account</Link>
      </Typography>
    </MainContainer>
  );
};

export default Login;
