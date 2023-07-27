const Stories = require("./Stories");


const isAuthorOfStories = async (req,res, next) =>{
    const id = req.params.id || req.body.id;

    const story = await Stories.findByPk(id);

    if(!story) res.status(400).send({message: "Story with that id doenst exist "})
    if( req.user.id === story.userId) next();
    else res.status(403).send({message: "Access forbidden"})
}


module.exports = {isAuthorOfStories};
