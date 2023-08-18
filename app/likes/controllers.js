const Like = require('./Like');

const createLike =  async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId, commentId, storiesId } = req.body;
        const newLike = await Like.create({ userId, postId, commentId, storiesId });
        res.status(201).json(newLike);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating like' });
      }
  };

  const deleteLike = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId, commentId, storiesId } = req.body;
        await Like.destroy({
          where: {
            userId,
            [Op.or]: [
              { postId },
              { commentId },
              { storiesId },
            ]
          }
        });
        res.status(204).send();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting like' });
      }
  };

  module.exports ={
    createLike, deleteLike
  }