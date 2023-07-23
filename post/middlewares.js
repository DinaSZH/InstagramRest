const Post = require("./models/Post");


const isAuthorOfPost = async (req,res, next) =>{
    const id = req.params.id || req.body.id;

    const post = await Post.findByPk(id);

    if(!post) res.status(400).send({message: "Post with that id doenst exist "})
    if( req.user.id === post.userId) next();
    else res.status(403).send({message: "Access forbidden"})
}


module.exports = {isAuthorOfPost};
