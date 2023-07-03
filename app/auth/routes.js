const express = require('express');
const router = express.Router();
const { verifyUser, registerUser } = require("./controllers");

router.post("/api/auth/verifyUser", verifyUser);
router.post('/api/auth/registerUser', registerUser)
module.exports = router;