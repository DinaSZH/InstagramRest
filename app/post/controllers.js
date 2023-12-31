const Post = require("./models/Post");
const User = require('../auth/User');
const PostContent = require("./models/PostContent");
const fs = require('fs');
const path = require("path");

const createPost = async (req, res) => {
  try{
    const post = await Post.create({
      description: req.body.description,
      userId: req.user.id
    });
  
    if (req.files && req.files.length > 0) {
      // Handle multiple files
      for (const file of req.files) {
        await PostContent.create({
          postId: post.id,
          userId: req.user.id,
          content_url: '/posts/' + file.filename
        });
      }
    } else if (req.file) {
      // Handle single file
      await PostContent.create({
        postId: post.id,
        userId: req.user.id,
        content_url: '/posts/' + req.file.filename
      });
    }
  
    res.status(200).send(post);
  } catch(error){
    res.status(500).send(error)
}
  };

////////////////////////////

const getAllMyPosts = async (req, res) => {
  try{
  const posts = await Post.findAll({
      where: {userId:req.user.id},
      include: [
        {
          model: PostContent,
          as: "postContent"
        }
      ]
  })

  res.status(200).send(posts);
} catch(error){
  res.status(500).send(error)
}
}

//////////////////////////////
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: PostContent,
          as: "postContent"
        }
      ]
    });

    if (posts) {
      res.status(200).send({ posts });
    } else {
      res.status(200).send("Empty");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};




const getPostById = async (req, res) => {
  try{
  const post = await Post.findByPk(req.params.id, {
      include: [
          {
              model: PostContent,
              as: "postContent"
          },
      ]
  });

  res.status(200).send(post);
} catch(error){
  res.status(500).send(error)
}
}

////////////////

const deletePostById = async (req, res) => {
  try{
  const data = await Post.destroy({
      where: {
          id: req.params.id,
      },
  })

  res.status(200).end();
} catch(error){
  res.status(500).send(error)
}
}


/////////////

const editPost = async (req, res) => {
  try{
    await Post.update({
        description: req.body.description,
        userId: req.user.id
    }, {
        where: {
            id:req.params.id
    }})

    await PostContent.destroy({
        where: {
            postId: req.params.id
        }
    })

    const post = {
        id: req.params.id
    }
  
    if(req.body.postContent && req.body.postContent.length >0 ){
        req.body.postContent.forEach(async content => {
            await PostContent.create({
              postId: post.id,
              userId: req.user.id,
              content_url: content.content_url
            })
        });
    }
  } catch(error){
    res.status(500).send(error)
}
}

/////////////

const getPostsByUsername = async (req, res) => {
  const username = req.params.username; 

  try {
    const user = await User.findOne({ where: { username } });
    console.log('Found user:', user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.findAll({
      where: {userId:user.id},
      include: [
        {
          model: PostContent,
          as: "postContent"
        }
      ]
  })
    

    res.status(200).send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching posts' });
  }
}


module.exports = {
    createPost,
    getAllMyPosts,
    getAllPosts,
    getPostById,
    deletePostById, 
    editPost,
    getPostsByUsername
};