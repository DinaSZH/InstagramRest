const express = require("express");
const router = express.Router();
const { createStories, deleteStories, getMyStoriesForLast24Hours } =require("./controllers");
const { isAuthorOfStories } = require("./middlewares")
const passport = require("passport");

router.post("/api/stories", passport.authenticate('jwt', {session: false}), createStories);
router.delete("/api/stories/:id", passport.authenticate('jwt', {session: false}) , isAuthorOfStories,  deleteStories);
router.get("/api/allStories", passport.authenticate('jwt', {session: false}) , getMyStoriesForLast24Hours);

module.exports = router;