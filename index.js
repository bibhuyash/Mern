const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose
  .connect(
    "mongodb+srv://bibhuyash:Avichal.28@cluster0-i1ot5.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("DB Connected"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => {
  console.log("Connection successful at 5000 Port");
});
