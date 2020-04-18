const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./model/user");
const { auth } = require("./middleware/auth");
const config = require("./config/key");

const app = express();

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/api/user/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
});

app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ sucess: false, err });
    return res.status(200).json({
      sucess: true,
      userdata: doc,
    });
  });
});

app.post("/api/user/login", (req, res) => {
  //find the email

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSucess: false,
        message: "Auth Failed. Email not found",
      });
    }
    //comapre password
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSucess: false, message: "Wrong Password" });
      }
    });
    //generate token
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res.cookie("x_auth", user.token).status(200).json({ loginsucess: true });
    });
  });
});

app.get("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(5000, () => {
  console.log("Connection successful at 5000 Port");
});
