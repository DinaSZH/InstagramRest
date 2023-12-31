const express = require("express");
const router = express.Router();
const { createPost, getAllMyPosts, getAllPosts, getPostById,deletePostById, editPost, getPostsByUsername  } =require("./controllers");
const { isAuthorOfPost } = require("./middlewares")
const {upload} = require("./utils");
const passport = require("passport");

router.post("/api/post", passport.authenticate('jwt', { session: false }), upload.array('content_url', 10), createPost);
router.get("/api/myPosts", passport.authenticate('jwt', {session: false}) , getAllMyPosts);
router.get("/api/posts",  getAllPosts);
router.get("/api/post/:id", passport.authenticate('jwt', {session: false}) ,  getPostById);
router.delete("/api/post/:id", passport.authenticate('jwt', {session: false}) , isAuthorOfPost,  deletePostById);
router.put("/api/post/:id", passport.authenticate('jwt', {session: false}) , isAuthorOfPost, editPost);

// Создать API для получения списка постов по username пользователя 
router.get('/api/posts/byUsername/:username', getPostsByUsername);

module.exports = router;
