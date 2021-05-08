const express = require('express');
const router = express.Router();

const Post = require('../models/Post.js');
const Forum = require('../models/Forum.js');
const Comment = require('../models/Comment.js');

const insertPost = async (forum, req, res) => {
	const { userId, content, date } = req.body;

	const found = await Forum.findOne({ name: forum });
	const post = {
		userId: userId,
		forumId: found._id,
		content: content,
		date: date,
	};

	const query = new Post(post);
	const savedQuery = await query.save();

	res.json(savedQuery);
};

// Get Forums based on the Forum Parameter
router.get('/:forum', async (req, res) => {
	const { forum } = req.params;
	const { _id: forumId } = await Forum.findOne({ name: forum });
	const query = await Post.find({ forumId: forumId });
	res.json(query);
});

// Insert Post based on the Forum Parameter
router.post('/:forum', async (req, res) => {
	const { forum } = req.params;
	insertPost(forum, req, res);
});

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

// Insert Forum
router.post('/', async (req, res) => {
	try {
		const query = new Forum(req.body);
		const isNameFound = await Forum.find(req.body);
		if (!isNameFound.length) {
			const history = await query.save();
			res.json(await history);
		} else res.json({ message: 'Name Already Used' });
	} catch (error) {
		res.json(error);
	}
});

module.exports = router;
