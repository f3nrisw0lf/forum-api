const express = require('express');
const passport = require('express');
const router = express.Router();

const User = require('../models/User.js');

router.post('/', async (req, res) => {
	try {
		User.authenticate('local')(req, res, () => {
			res.json({ message: 'Auth' });
		});
	} catch (error) {
		res.json(error);
	}
});

module.exports = router;
