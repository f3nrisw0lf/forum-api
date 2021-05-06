const express = require('express');
const router = express.Router();

const User = require('../models/User.js');

router.get('/', async (req, res) => {
	const isFound = await User.find().exec();
	res.json(await isFound);
});

module.exports = router;
