const express = require("express");
const router = express.Router();

//custom imports
const User = require("../models/User");
const Post = require("../models/Post");
const verification = require("../middleware/verification");


//get 10 posts for current user each time the request is made
router.get('/dashboard', verification, async (req, res) => {
    try {
        const current_user = await User.findById(req.user.id).select("-password -__v -email");

        if (!current_user) return res.status(401).send({error: "User not found."});

        const userPosts = await Post.aggregate([
            { $match: {"user": current_user._id} },
            { $sort: {"date": -1} },
            {$facet: {
                posts: [{$skip: parseInt(req.query.offset)}, {$limit: 10}, {$project: {_id: 1, title: 1, content: 1}}]
            }
        }])

        res.send({data: [{user: current_user}, ...userPosts]})

    } catch (error) {
        console.log(error)
        res.status(500).send({error: "Couldn't get posts."})
    }
})

module.exports = router;