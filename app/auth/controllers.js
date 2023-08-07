const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("./User");
const {jwtOptions} = require("./passport");
const fs = require('fs');
const path = require("path");
const Follower = require("./Follower");



const signUp = async (req, res) => {

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
   await User.create({
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
      bio: req.body.bio,
      user_image: '/userLogo/' + req.file.filename,

    });
    res.status(200).end();

  };


  const login = async (req, res) => {
    if(!req.body.email || req.body.email.length === 0 ||
      !req.body.password || req.body.password.length === 0){
        res.status(401).send({message : "Bad Credentials"});
      } else{

        const user = await User.findOne({
          where: {
            email: req.body.email
          }
        })

        if(!user) return res.status(401).send({message: "User with that email doenst exist"});

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(isMatch){

          const token = jwt.sign({
                    id: user.id, 
                    email: user.email,
                    password: user.password,
                    username: user.username, 
                    bio: user.bio,
                    user_image: user.user_image
                  }, jwtOptions.secretOrKey,
                  { expiresIn: 24 * 60 * 60 * 365});
                  res.status(200).send({token});

        } else {  
          res.status(401).send({message: "Password is incorrect"});
          }
      }
    }


    const editUser = async (req, res) => {
      const userId = req.user.id;
      console.log(req.file)
      try {
        const user = await User.findByPk(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        fs.unlinkSync(path.join(__dirname + "../../../public/" + user.user_image));
    
        user.username = req.body.username;
        user.email = req.body.email;
        user.bio = req.body.bio;
        user.user_image = `/userLogo/${req.file.filename}`;
    
        await user.save();
    
        return res.status(200).send({ message: 'User data updated successfully' });
      } catch (error) {
        console.error('Error updating user data:', error);
        return res.status(500).send({ error: 'Internal server error' });
      }
    };
     

   const  followUser = async (req, res) => {
      try {
        const userId = req.user.id; // Current user's ID
        const followerId = req.params.id; // User to follow's ID

        console.log("userId:", userId);
    console.log("followerId:", followerId);
    
        const follow = await Follower.create({ userId, followerId });
        res.status(201).json(follow);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error following user" });
      }
    };
    
    const unfollowUser = async (req, res) => {
      try {
        const userId = req.user.id;
        const followerId = req.params.userId;
    
        await Follower.destroy({ where: { userId, followerId } });
    
        res.status(200).json({ message: "Unfollowed successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error unfollowing user" });
      }
    };
  module.exports = {
    signUp,
    login,
    editUser,
    followUser,
    unfollowUser
  };