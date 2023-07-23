const express = require('express');
const router = express.Router();
const { signUp, login, editUser } = require("./controllers");
const {validateSignup}  = require("./middlewares") ; 
const {upload} = require("./utils");
const passport = require("passport");


router.post("/api/auth/signup",  upload.single('user_image'), validateSignup, signUp);
router.post('/api/auth/login', login);
router.put('/api/auth/edit',  passport.authenticate('jwt', {session: false}), upload.single('user_image'), editUser);

module.exports = router;