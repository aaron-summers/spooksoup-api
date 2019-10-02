const express = require('express');
const router = express.Router();
const validator = require('validator');

//custom imports
const verification = require('../middleware/verification');
const User = require('../models/User');
const Post = require('../models/Post');

//create a post
router.post('/posts', verification, async (req, res) => {
    const doesTitleExist = validator.isEmpty(req.body.title);
    // console.log(doesTitleExist)

    if(doesTitleExist) return res.status(400).send({error: "Looks like you forgot the title."});

    const user = await User.findById(req.user.id).select('-password');

    const new_post = new Post({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id,
        username: user.username
    })

    try {
        const post = new_post;
        await post.save();
        //the following two lines will probably not be scalable
        // user.posts.push(post._id);
        // await user.save();
        res.send(post);

    } catch (error) {
        res.status(500).send({error: "Oops! Something went wrong."})
    }
})

//get all posts
router.get('/posts', verification, async (req, res) => {
    try {
        const posts = await Post.find().sort({date: -1})
        res.send(posts)
    } catch (error) {
        res.status(500).send({error: "Oops! Something went wrong."})
    }
})

module.exports = router;
