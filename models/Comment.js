const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
	nameId: String,
	parentCommentId: String,
	content: String,
	date: Date,
});

commentSchema.set('autoIndex', true);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
