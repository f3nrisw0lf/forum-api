const express = require('express');
const router = express.Router();

const User = require('../models/User.js');

router.post('/', async (req, res, next) => {
	const { email, password, username } = req.body;

	if (email.split('@')[1] !== 'aiesec.net')
		res.json({ code: 54, message: 'Invalid Email' });

	const user = new User({ username: username, email: email });

	User.register(user, password, (error) => {
		if (error) res.json({ success: false, message: 'Error!!', error });
		else res.json({ status: 201, success: true, message: 'Account Added!!' });
	});
});

module.exports = router;
