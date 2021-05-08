const express = require('express');
const router = express.Router();

const Comment = require('../models/Comment.js');

// Get Comments based on Post ID
router.get('/:forum/:postId', async (req, res) => {
	const { postId } = req.params;
	const query = await Comment.find({ parentCommentId: postId });
	res.json(query);
});

// Insert Comment based on Post ID
router.post('/:forum/:postId', async (req, res) => {
	const { postId } = req.params;
	const { nameId, content } = req.body;

	const comment = {
		nameId: nameId,
		content: content,
		postId: postId,
		parentCommentId: null,
		date: new Date(),
	};

	try {
		const query = new Comment(comment);
		const savedQuery = await query.save();
		res.json(savedQuery);
	} catch (error) {
		res.json(error);
	}
});

module.exports = router;
