const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
	createdBy: String,
	forumId: String,
	content: String,
	reactions: [
		{
			createdBy: String,
			content: String,
		},
	],

	comments: [
		{
			_id: String,
			createdBy: String,
			reactions: [
				{
					_id: String,
					createdBy: String,
					content: String,
				},
			],
		},
	],
	date: Date,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
