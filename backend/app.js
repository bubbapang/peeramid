const debug = require('debug')
const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const { isProduction } = require('./config/keys');
const csurf = require('csurf');

const usersRouter = require('./routes/api/users'); // update the import file path
const tweetsRouter = require("./routes/api/tweets");
const csrfRouter = require('./routes/api/csrf');

const app = express();

app.use(logger('dev')); // log request components (URL/method) to terminal
app.use(express.json()); // parse JSON request body
app.use(express.urlencoded({ extended: false })); // parse urlencoded request body
app.use(cookieParser()); // parse cookies as an object on req.cookies

if (!isProduction) {
  // Enable CORS only in development because React will be on the React
  // development server (http://localhost:3000). (In production, the Express 
  // server will serve the React files statically.)
    app.use(cors());
}

// ...
app.use(
    csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
    })
);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});

const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
    message: err.message,
    statusCode,
    errors: err.errors
})
});


// Attach Express routers
app.use('/api/users', usersRouter); // update the path
app.use('/api/tweets', tweetsRouter);
app.use('/api/csrf', csrfRouter);
module.exports = app;
