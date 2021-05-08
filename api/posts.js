const express = require('express');
const router = express.Router();

const Post = require('../models/Post.js');
const Forum = require('../models/Forum.js');
// const Comment = require('../models/Comment.js');

// Get Posts based on Forum Name
router.get('/:forum', async (req, res) => {
	const { forum } = req.params;
	const request = await Forum.findOne({ name: forum });
	console.log(request);
	if (request !== null) {
		const query = await Post.find({ forumId: request._id });
		res.json(query);
	} else res.json('NOT FOUND');
});

// Insert Post based on the Forum Parameter
router.post('/:forum', async (req, res) => {
	const { forum } = req.params;
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
});

// const insertPost = async (forum, req, res) => {
// 	const { userId, content, date } = req.body;

// 	const found = await Forum.findOne({ name: forum });
// 	const post = {
// 		userId: userId,
// 		forumId: found._id,
// 		content: content,
// 		date: date,
// 	};

// 	const query = new Post(post);
// 	const savedQuery = await query.save();

// 	res.json(savedQuery);
// };

module.exports = router;
