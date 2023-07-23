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

  const posts = await Post.findAll({
      where: {userId:req.user.id},
  })

  res.status(200).send(posts);
}

//////////////////////////////
const getAllPosts = async (req, res) => {
  const posts = await Post.findAll();
  if(posts){
    res.status(200).send({ posts });
  } else{
    res.status(200).send("Empty");
  }

};



const getPostById = async (req, res) => {

  const post = await Post.findByPk(req.params.id, {
      include: [
          {
              model: Comment,
              as: "comment"
          },
          {
              model: Like,
              as: "like"
          },
          {
              model: PostContent,
              as: "postContent"
          },
      ]
  });

  res.status(200).send(post);
}

////////////////

const deletePostById = async (req, res) => {

  const data = await Post.destroy({
      where: {
          id: req.params.id,
      },
  })

  res.status(200).end();
}


/////////////

const editPost = async (req, res) => {
    await Post.update({
        description: req.body.description,
        publish_date: req.body.publish_date,
        userId: req.user.id
    }, {
        where: {
            id:req.body.id
    }})

    await Comment.destroy({
        where: {
            postId: req.body.id
        }
    }) 

    await Like.destroy({
        where: {
            postId: req.body.id
        }
    })

    await PostContent.destroy({
        where: {
            postId: req.body.id
        }
    })

    const post = {
        id: req.body.id
    }

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
}


module.exports = {
    createPost,
    getAllMyPosts,
    getAllPosts,
    getPostById,
    deletePostById, 
    editPost
};
