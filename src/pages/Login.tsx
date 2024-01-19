import React, { useState } from "react";

import { Button, TextField, Typography } from "@mui/material";
import { Col, Row } from "antd";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { setUser } from "../components/authentication/usersSlice";

import styles from "./styles/Login.module.css";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [failedLogin, setFailedLogin] = useState(false);

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailValue, passwordValue)
      .then(({ user }) => {
        if (user?.email) {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
            })
          );
          localStorage.setItem("token", (user as any).accessToken.toString());
          navigate("/");
        }
      })
      .catch((error) => setFailedLogin(error));
  };

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <div className={styles.mainContainer}>
      <Row>
        <Col xs={{ span: 18, offset: 3 }} sm={{ span: 8, offset: 8 }}>
          <Typography
            sx={{
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
            }}
            variant="h1"
            fontSize={40}
          >
            Please log in
          </Typography>
          <TextField
            sx={{ marginBottom: "20px" }}
            label="Email adress"
            fullWidth
            value={emailValue}
            onChange={(event) => {
              setEmailValue(event.target.value.trim());
            }}
          />
          <TextField
            sx={{ marginBottom: "20px" }}
            label="Password"
            type="password"
            fullWidth
            value={passwordValue}
            onChange={(event) => {
              setPasswordValue(event.target.value.trim());
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
          <Row>
            <Col span={12} offset={6}>
              <Button
                variant="contained"
                fullWidth={true}
                size="large"
                onClick={handleLogin}
              >
                Sign In
              </Button>
            </Col>
          </Row>
          <Typography
            variant="h2"
            fontSize={20}
            sx={{
              mt: "40px",
            }}
          >
            <Link to="/Register">Create an account</Link>
          </Typography>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
