const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
	userId: String,
	forumId: String,
	content: String,
	date: Date,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
