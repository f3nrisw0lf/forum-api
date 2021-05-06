const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	console.log(req.user);
	req.logout();
	res.json(req.user);
});

module.exports = router;
