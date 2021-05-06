const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const signup = require('./api/signup.js');
const login = require('./api/login.js');
const forum = require('./api/forums.js');

require('dotenv').config();
const { PORT, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('CONNECTED!');
});

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.json({
		name: MONGO_URI,
	});
});

app.use('/signup', signup);
app.use('/login', login);
app.use('/f', forum);

app.listen(PORT, () => {
	console.log(`Listening in port http://localhost:${process.env.PORT}`);
});
