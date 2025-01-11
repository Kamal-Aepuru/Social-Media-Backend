const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { corsMiddleware } = require('../middleware/corsMiddleware');

// Fetch all posts
router.get('/', corsMiddleware, async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name').sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a post
router.post('/', corsMiddleware, async (req, res) => {
    const { user, content } = req.body;
    try {
        const newPost = new Post({ user, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
