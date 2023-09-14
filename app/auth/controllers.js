const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("./User");
const {jwtOptions} = require("./passport");
const { Op } = require('sequelize');
const fs = require('fs');
const path = require("path");
const Follower = require("./Follower");



const signUp = async (req, res) => {

  try {

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
  } catch(error){
    res.status(500).send(error)
}

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
     

    const followUser = async (req, res) => {
      try {
        const userId = parseInt(req.params.id, 10);; // Current user's ID
        const followerId = req.user.id; // User to follow's ID
        console.log("UserId: ", userId);
          console.log("FollowerId: ", followerId);
    
        if (userId === followerId) {

          return res.status(400).json({ message: "Cannot follow yourself" });
        }
    
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

    const getFollowers = async (req, res) => {
      const username = req.params.username; 
      try {
        const user = await User.findOne({ where: { username } });
        console.log('Found user:', user);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const followers = await Follower.findAll({ where: { userId: user.id } }); 
    
        res.status(200).send(followers);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching followers' });
      }

    }

    const getFollowings = async (req, res) => {
      const username = req.params.username; 

      try {
        const user = await User.findOne({ where: { username } });
        console.log('Found user:', user);
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        const followings = await Follower.findAll({ where: { followerId: user.id } }); 
    
        res.status(200).send(followings);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching following users' });
      }
    }

    const getUserInfo = async (req, res) => {
      const username = req.params.username;

      try {
        const user = await User.findOne({ where: { username },
          attributes: ['id', 'username', 'user_image', 'bio'], });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        res.status(200).send(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching user details' });
      }
    }

    const getSuggestions = async (req, res) => {
      const userId = req.user.id;
    
      try {
        // Get IDs of the followers of the user
        const userFollowerIds = await Follower.findAll({
          where: { userId },
          attributes: ['followerId'],
        });
    
        // Get IDs of users who are followed by the followers of the user
        const suggestedUserIds = await Follower.findAll({
          where: {
            followerId: userFollowerIds.map(follower => follower.followerId),
            userId: { [Op.not]: userId },
          },
          attributes: ['userId'],
        });
    
        // Get IDs of users whom the current user is already following
        const followedUserIds = await Follower.findAll({
          where: { followerId: userId },
          attributes: ['userId'],
        });
    
        // Filter out the IDs of users whom the current user is already following
        const filteredSuggestedUserIds = suggestedUserIds.filter(suggestedUser => {
          return !followedUserIds.some(followedUser => followedUser.userId === suggestedUser.userId);
        });
    
        // Get information about suggested users
        const suggestions = await User.findAll({
          where: { id: filteredSuggestedUserIds.map(suggestedUser => suggestedUser.userId) },
          limit: 5,
          attributes: ['id', 'username', 'user_image', 'bio'],
        });
    
        res.status(200).json(suggestions);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching suggestions' });
      }
    };
    
  module.exports = {
    signUp,
    login,
    editUser,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowings,
    getUserInfo,
    getSuggestions
  };