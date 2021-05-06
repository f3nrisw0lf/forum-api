const express = require('express');
const router = express.Router();

const User = require('../models/User.js');

router.post('/', async (req, res, next) => {
	const user = new User(req.body);
	try {
		const savedUser = await user.save();
		res.json(await savedUser);
	} catch (error) {
		res.json(error);
	}
});

module.exports = router;
