const express = require("express");
const logger = require("morgan");
const passport = require('passport');
const cors = require("cors");


const app = express();

app.use(logger("dev"));
app.use(cors())
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(passport.initialize());

require('./app/auth/passport')

app.use(require("./app/auth/routes"));
app.use(require("./app/post/routes"));
app.use(require("./app/stories/routes"));
app.use(require("./app/comment/routes"));
app.use(require("./app/likes/routes"));

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(3001, () => {
  console.log("Server is listening on port 3000");
});
