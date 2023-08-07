const express = require('express');
const router = express.Router();
const { signUp, login, editUser, followUser, unfollowUser } = require("./controllers");
const {validateSignup}  = require("./middlewares") ; 
const {upload} = require("./utils");
const passport = require("passport");


router.post("/api/auth/signup",  upload.single('user_image'), validateSignup, signUp);
router.post('/api/auth/login', login);
router.put('/api/auth/edit',  upload.single('user_image'), passport.authenticate('jwt', {session: false}),  editUser);


// followers
router.post("/api/users/:id/following", passport.authenticate("jwt", { session: false }), followUser);
router.delete("/api/users/:id/following", passport.authenticate("jwt", { session: false }), unfollowUser);
module.exports = router;