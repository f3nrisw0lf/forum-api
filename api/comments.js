const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Post = require('../models/Post.js');

// Get Comments based on Post ID
router.get('/:postId', async (req, res) => {
	const { postId } = req.params;
	const query = await Post.find({ _id: postId });
	res.json(query);
});

// Insert Comment based on Post ID
router.post('/:postId', async (req, res) => {
	const { postId } = req.params;
	const { createdBy, content } = req.body;

	const commentTemp = {
		_id: mongoose.Types.ObjectId(),
		createdBy: createdBy,
		content: content,
		postId: postId,
		date: new Date(),
	};

	try {
		const query = await Post.findByIdAndUpdate(
			{ _id: postId },
			{ $push: { comments: commentTemp } },
		);
		res.json(query);
	} catch (error) {
		res.json(error);
	}
});

module.exports = router;
