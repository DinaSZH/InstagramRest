const Post = require("../post/models/Post");
const Comment = require("./Comment");

const createComment = async (req, res) => {
    const post = await Post.findByPk(req.body.postId) 

    try{
        const comment = await Comment.create({
            comment_text: req.body.comment_text,
            userId: req.user.id,
            postId: req.params.id
        })

        res.status(200).send(comment);
    } catch(error){
        console.error(error);
         res.status(500).json({ message: 'Error creating comment' });
    }
    
}

const deleteComment = async(req, res)=> {
    try {
        const commentId = req.params.id;
        const userId = req.user.id; 

        const comment = await Comment.findOne({ where: { id: commentId } });
    
        if (!comment) {
          return res.status(404).json({ message: 'Comment not found' });
        }
    
        // Проверьте, является ли пользователь поста или автором комментария
        if (comment.userId !== userId && comment.post.userId !== userId) {
          return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }
    
        await Comment.destroy({
          where: { id: commentId },
        });
    
        res.status(200).json({ message: 'Comment deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting comment' });
      }
}

const getCommentsForPost = async(req, res) => {
    try {
        const postId = req.params.id;
    
        const comments = await Comment.findAll({
          where: { postId },
        });
    
        res.status(200).json(comments);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching comments' });
      }
}

module.exports = {
    createComment,
    deleteComment,
    getCommentsForPost
}