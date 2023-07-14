const express = require("express");
const router = express.Router();
const { createPost, getAllMyPosts, getAllPosts, getPostById,deletePostById } =require("./controllers")
const passport = require("passport");

router.post("/api/post", passport.authenticate('jwt', {session: false}) , createPost);
router.get("/api/getAllMyPosts", passport.authenticate('jwt', {session: false}) , getAllMyPosts);
router.get("/api/getAllPosts",  getAllPosts);
router.get("/api/post/:id",  getPostById);
router.delete("/api/post/:id",  deletePostById);

module.exports = router;