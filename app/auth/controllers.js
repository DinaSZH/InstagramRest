const jwt = require('jsonwebtoken');

const User = require("./User");
const {jwtOptions} = require("./passport")

const registerUser = async (req, res) => {
  
   await User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    });
    res.status(200).end();

  };

const verifyUser = async (req, res) => {
    console.log(req.body);
    let user
    const { email, password, username } = req.body;
    if (email) {
      user = await User.findOne({ 
        where: { email, password }
      });
    } else {
      user = await User.findOne({ 
        where: { username, password }
      });
    }
      
    if (!user) {
      res.status(401).send({ error: "User not found or password is incorrect" });
    }  else {
          
      const token = jwt.sign({
        id: user.id, 
        email: user.email,
        password: user.password,
        username: user.username, 
        bio: user.bio,
      }, jwtOptions.secretOrKey,
      { expiresIn: 24 * 60 * 60 * 365});
      res.status(200).send({token});
    }
  };

  module.exports = {
    verifyUser,
    registerUser
  };