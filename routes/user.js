const express = require('express');
const router = express.Router();

//custom imports
const User = require('../models/User');
const Post = require("../models/Post");
const verification = require('../middleware/verification');

router.get('/user/profile', verification, async (req, res) => {
    try {
        const current_user = await User.findById(req.user.id)
          .select("-password -__v");

        if (!current_user) return res.status(401).send({error: "Unauthorized request."});

        res.send(current_user)

    } catch (error) {
        res.status(500).send({error: "Oops! Something went wrong."})
    }
})

//get all posts from current user
router.get('/posts', verification, async (req, res) => {
    try {
        const current_user = await User.findById(req.user.id).select("-password -__v");

        if (!current_user) return res.status(401).send({error: "Unauthorized request."});

        const userPosts = await Post.find({user: current_user._id}).select("id title content likes comments");

        res.send({data: [{user: current_user, posts: userPosts}]})

    } catch (error) {
        console.log(error)
        res.status(500).send({error: "Couldn't get posts."})
    }
})

module.exports = router;