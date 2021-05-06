const express = require('express');
const passport = require('passport');
const router = express.Router();

// Auth based on the Request Body
router.post('/', passport.authenticate('local'), (req, res) => {
	res.json(req.body);
});

module.exports = router;
