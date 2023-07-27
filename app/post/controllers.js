const Post = require("./models/Post");
const PostContent = require("./models/PostContent");
const fs = require('fs');
const path = require("path");

const createPost = async (req, res) => {
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
  };
  

// const createPost = async (req, res) => {
    
//   const post = await Post.create({
//       description: req.body.description,
//       userId: req.user.id
//   })

//   if(req.body.comment && req.body.comment.length >0 ){
//       req.body.comment.forEach(async comm => {
//           await Comment.create({
//               postId: post.id,
//               comment_text: comm.comment_text,
//               userId: req.user.id
//           })
//       });
//   }

//   if(req.body.like && req.body.like.length >0 ){
//       req.body.like.forEach(async lk => {
//           await Like.create({
//               postId: post.id,
//               userId: req.user.id
//           })
//       });
//   }

// if (req.body.postContent && req.body.postContent.length > 0) {
//     req.body.postContent.forEach(async (content) => {
//       const postContent = await PostContent.create({
//         postId: post.id,
//         userId: req.user.id,
//         content_url: '/posts/' + content.filename, // Use the unique filename for each content
//       });
//     });
//   }
  

//   res.status(200).send(post);
// }

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
}


module.exports = {
    createPost,
    getAllMyPosts,
    getAllPosts,
    getPostById,
    deletePostById, 
    editPost
};
