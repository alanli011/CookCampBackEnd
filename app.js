const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { environment } = require('./config');

//routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');

const app = express();

// morgan will allow log in the console what's happening
app.use(morgan('dev'));

//
app.use(express.json());
app.use(cors({ origin: true })); //change path to host-address when acquired

//mount routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
	const err = new Error("The requested resource couldn't be found.");
	err.status = 404;
	next(err);
});

// Custom error handlers.
// Generic error handler.
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	const isProduction = environment === 'production';
	res.json({
		title: err.title || 'Server Error',
		message: err.message,
		errors: err.errors,
		stack: isProduction ? null : err.stack
	});
});

module.exports = app;
