const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use("/login", (req, res) => {
  const { login, password } = req.body;
  if (login === "hrumstik" && password === "sasha123") {
    res.send({ token: "test123" });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

app.listen(8080, () =>
  console.log("API is running on http://localhost:8080/login")
);
