const mongoose = require('mongoose');

const { Schema } = mongoose;

const forumSchema = new Schema({
	name: String,
});

forumSchema.set('autoIndex', true);
const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;
