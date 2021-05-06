const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/User.js');

router.post('/', passport.authenticate('local'), (req, res) => {
	res.json(req.user.username);
});

module.exports = router;
