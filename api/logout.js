const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/User.js');

router.get('/', async (req, res) => {
	const response = req.logout();
	res.json(response);
});

module.exports = router;
