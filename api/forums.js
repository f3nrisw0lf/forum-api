const express = require('express');
const router = express.Router();

const Post = require('../models/Post.js');
const Forum = require('../models/Forum.js');
const Comment = require('../models/Comment.js');

// Get all Forums
router.get('/', async (req, res) => {
	const forums = await Forum.find();
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
	const forums = await Forum.findOne({ name: forumName });
	const posts = await Post.find({ forumId: forums._id });
	const comments = Promise.all(
		posts.map((post) => {
			const poster = await User.findOne({ _id: post.userId});
			const commentTemp = await Comment.find({postId: post._id})
			if(commentTemp !== null){
				const all = commentTemp.map((element) => {
						
				})
			}

		}),
	);
	res.json(forums);
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
