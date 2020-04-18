const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./model/user");
const config = require("./config/key");

const app = express();

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB Connected"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userdata) => {
    if (err) return res.json({ sucess: false, err });
  });
  return res.status(200).json({
    sucess: true,
  });
});

app.listen(5000, () => {
  console.log("Connection successful at 5000 Port");
});
