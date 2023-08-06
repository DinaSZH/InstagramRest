const express = require("express");
const router = express.Router();
const { createComment, deleteComment, getCommentsForPost } =require("./controllers");
const passport = require("passport");

router.post("/api/post/:id/comment", passport.authenticate('jwt', {session: false}), createComment);
router.delete("/api/comment/:id", passport.authenticate('jwt', {session: false}),  deleteComment);
router.get("/api/post/:id/comment", passport.authenticate('jwt', {session: false}),  getCommentsForPost);

module.exports= router