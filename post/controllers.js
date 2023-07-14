const Post = require("./models/Post");
const Comment = require("./models/Comment");
const Like = require("./models/Like");
const PostContent = require("./models/PostContent");
const SavedPost = require("./models/SavedPost");

const createPost = async (req, res) => {
    
  const post = await Post.create({
      description: req.body.description,
      publish_date: req.body.publish_date,
      userId: req.user.id
  })

  if(req.body.comment && req.body.comment.length >0 ){
      req.body.comment.forEach(async comm => {
          await Comment.create({
              postId: post.id,
              comment_text: comm.comment_text,
              userId: req.user.id
          })
      });
  }

  if(req.body.like && req.body.like.length >0 ){
      req.body.like.forEach(async lk => {
          await Like.create({
              postId: post.id,
              userId: req.user.id
          })
      });
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

  res.status(200).send(post);
}

////////////////////////////



const getAllMyPosts = async (req, res) => {
  const userId = req.user.id;
  try {
    const posts = await Post.findAll({
      where: {
        userId: userId,
      },
    });

    res.status(200).send(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send( "An error occurred while fetching user posts." );
  }
};

const getAllPosts = async (req, res) => {
  const posts = await Post.findAll();
  if(posts){
    res.status(200).send({ posts });
  } else{
    res.status(200).send("Empty");
  }

};

const getPostById = async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (post) {
    res.status(200).send(post);
    res.status(200).send("ok");
  } else {
    res.status(404).send("Post Not found");
  }
};

const deletePostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);

    if (post) {
      await post.destroy();
      res.status(200).send("Post deleted successfully.");
    } else {
      res.status(404).send("Post not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the post.");
  }
};

module.exports = {
    createPost,
    getAllMyPosts,
    getAllPosts,
    getPostById,
    deletePostById
};
