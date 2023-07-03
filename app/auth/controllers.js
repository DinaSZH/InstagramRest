const jwt = require('jsonwebtoken');

const User = require("./User");
const {jwtOptions} = require("./passport")

const verifyUser = async (req, res) => {
  
   await User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    });
    res.status(200).end();

  };

const registerUser = async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({ 
        where: { 
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        }
      });
      
  //проверка doesnt work correctly, when i want to put incorrect password then it shows user not found
    if (!user) {
      res.status(401).send({ error: "user not found" });
    } else if (user.email !== req.body.email) {
      res.status(401).send({ error: "email is incorrect" });
    } else if (user.password !== req.body.password) {
      res.status(401).send({ error: "password is incorrect" });
    } else {
          
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