const express = require("express");
const router = express.Router();
const { createPost, getAllMyPosts, getAllPosts, getPostById,deletePostById, editPost } =require("./controllers");
const { isAuthorOfPost } = require("./middlewares")
const passport = require("passport");

router.post("/api/post", passport.authenticate('jwt', {session: false}) , createPost);
router.get("/api/myPosts", passport.authenticate('jwt', {session: false}) , getAllMyPosts);
router.get("/api/posts",  getAllPosts);
router.get("/api/post/:id", passport.authenticate('jwt', {session: false}) ,  getPostById);
router.delete("/api/post/:id", passport.authenticate('jwt', {session: false}) , isAuthorOfPost,  deletePostById);


router.put("/api/post", passport.authenticate('jwt', {session: false}) , isAuthorOfPost, editPost);

module.exports = router;
