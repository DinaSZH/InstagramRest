const Stories = require("./Stories");
const { Op, DATE } = require("sequelize");

const createStories = async (req, res) => {
    const stories = await Stories.create({
        content_stories: req.body.content_stories,
        userId: req.user.id
    })

    res.status(200).send(stories);
}

const deleteStories = async (req, res) => {
    const story = await Stories.destroy({
        where: {
            id: req.params.id,
        },
    })
  
    res.status(200).end();
}

const getMyStoriesForLast24Hours = async (req, res) => {
    const userId = req.user.id;
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
    try {
      const stories = await Stories.findAll({
        where: {
          userId: userId,
          createdAt: {
            [Op.gte]: twentyFourHoursAgo,
          },
        },
      });
  
      res.status(200).send(stories);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while fetching stories.");
    }
  };

module.exports = {
    createStories,
    deleteStories,
    getMyStoriesForLast24Hours
}