const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredString = {
	type: String,
	unique: true,
	required: true,
};

const userSchema = new Schema({
	username: requiredString,
	password: {
		type: String,
		required: true,
	},
	email: requiredString,
});

userSchema.set('autoIndex', true);
const User = mongoose.model('User', userSchema);

module.exports = User;
