const express = require("express");
const router = express.Router();
const { createLike, deleteLike } =require("./controllers");
const passport = require("passport");

router.post("/api/like", passport.authenticate('jwt', {session: false}), createLike);
router.delete("/api/like", passport.authenticate('jwt', {session: false}),  deleteLike);

module.exports= router