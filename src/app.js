// ExpressJS dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const chalk = require('chalk');
const router = require('./api/router').default;
const { handleError } = require('./common/helpers/errorHandler');
// ExpressJS application
const app = express();
require('dotenv').config();
// ExpressJS middleware
if (app.get('env') !== 'test') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Router configuration
router.forEach((route) => {
  if (app.get('env') !== 'test') {
    console.log(
      `${chalk.green('✓')} ${chalk.bold.blue(
        route.method.toUpperCase()
      )}: ${chalk.blue(route.path)} configured and setup.`
    );
  }
  app[route.method](`/v1${route.path}`, ...route.handlers);
});

// 404 error handler
app.use((req, res) =>
  res.status(404).json({
    status: 'error',
    code: 404,
    message: `${req.url} not found`,
  })
);

// Error handler
app.use((err, req, res, _next) => {
  console.log(err);
  handleError(err, res);
});

// Initialize ExpressJS app
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  if (app.get('env') !== 'test') {
    console.log(
      `${chalk.green('✓')} App is running at http://localhost:${app.get(
        'port'
      )} in ${chalk.yellow(app.get('env'))} mode`
    );
    console.log('Press CTRL-C to stop\n');
  }
});

// Export app instance
module.exports = server;
