import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import routeIndex from './routes';


//  Set up the express
const app = express();

//  Log request to console
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// import routes into application
routeIndex(app);

// initialising express validator
app.use(validator());

// Setup a welcome message in JSON format.
app.get('*', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  });
});

export default app;
