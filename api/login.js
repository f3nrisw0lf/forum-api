const express = require('express');
const passport = require('passport');
const router = express.Router();

// Auth based on the Request Body
router.post('/', passport.authenticate('local'), (req, res) => {
	res.json(req.body);
});

router.get('/:userId', async (req, res) => {
	const { userId } = req.params;
	try {
		const user = await User.findOne({ _id: userId });
		res.json(user);
	} catch (error) {
		res.json(error);
	}
});

module.exports = router;
