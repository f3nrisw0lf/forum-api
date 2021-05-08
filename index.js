const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;

const signup = require('./api/signup.js');
const login = require('./api/login.js');
const logout = require('./api/logout.js');
const forum = require('./api/forums.js');
const comments = require('./api/comments.js');
const posts = require('./api/posts.js');

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
app.use(
	require('express-session')({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
	}),
);
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/User.js');
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/f', forum);
app.use('/comments', comments);
app.use('/posts', posts);

app.listen(PORT, () => {
	console.log(`Listening in port http://localhost:${process.env.PORT}`);
});
