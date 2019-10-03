const express = require('express');
const router = express.Router();
const validator = require('validator');

//custom imports
const verification = require('../middleware/verification');
const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');

//create a post
router.post('/posts', verification, async (req, res) => {
    const doesTitleExist = validator.isEmpty(req.body.title);
    // console.log(doesTitleExist)

    if(doesTitleExist) return res.status(400).send({error: "Title is required."});

    const user = await User.findById(req.user.id).select('-password');

    if (!user) return res.status(401).send({error: "Unauthorized request."})

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
        res.status(201).send(post);

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
});

//get post by ID
router.get(`/posts/:id`, verification, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).select('-__v');

        if (!post) return res.status(404).send({error: "Post not found."});

        res.status(200).send(post);

    } catch (error) {

        if (error.kind === 'ObjectId') return res.status(404).send({error: "Oops! Something went wrong. Couldn't fetch requested content."})

        res.status(500).send({error: "Internal Server Error."})
    }
});

//delete post by ID
router.delete('/posts/:id', verification, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).send({error: "Post not found."});
        if (req.user.id !== post.user.toString()) return res.status(401).send({error: "Unauthorized delete request."});

        await post.remove();

        res.status(200).send({confirmation: "Post Removed."});

    } catch (error) {

        if (error.kind === 'ObjectId') return res.status(404).send({error: "Invalid path."});

        res.status(500).send({error: "Internal Server Error."})
    }
});

//create or remove like and update post likes
router.patch("/posts/:id/like", verification, async (req, res) => {
    if (!req.params.id) return res.status(400).send({ error: "Invalid parameters." });

    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send({ error: "Post not found." });

        const existingLike = post.likes.find(like => like.user.toString() == req.user.id);

        if (!existingLike) {
            const like = new Like({
                user: req.user.id,
                post: post.id
            });

            await like.save();
            post.likes.unshift(like);
            await post.save();

            res.status(201).send({ post, like: true });
        } else {
            await Like.findByIdAndDelete(existingLike.id);
            const postIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
            post.likes.splice(postIndex, 1);
            await post.save();

            res.send({post, like: false});
        }

    } catch (error) {
        res.status(500).send({error: "Internal Server Error."})
    }

});

module.exports = router;
