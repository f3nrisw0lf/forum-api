const express = require('express');
const router = express.Router();

const Post = require('../models/Post.js');
const Forum = require('../models/Forum.js');

// Get all Forums
router.get('/', async (req, res) => {
	const forums = await Forum.find();
	console.log(forums[0]._id);
	res.json(forums);
});

// Get one Forums
router.get('/:forumName', async (req, res) => {
	const { forumName } = req.params;
	const forums = await Forum.find({ name: forumName });
	res.json(forums);
});

// Get one Forums
router.get('/:forumName/all', async (req, res) => {
	const { forumName } = req.params;
	const forum = await Forum.findOne({ name: forumName });
	const posts = await Post.find({ forumId: forum._id });
	res.json(posts);
});

// Insert Forum
router.post('/', async (req, res) => {
	try {
		const query = new Forum(req.body);
		const isNameFound = await Forum.find(req.body);
		if (!isNameFound.length) {
			const history = await query.save();
			res.json(history);
		} else res.json({ message: 'Name Already Used' });
	} catch (error) {
		res.json(error);
	}
});

module.exports = router;
