import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import router from './routes';


//  Set up the express
const app = express();

//  Log request to console
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());


// import routes into application
app.use(router);


const port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

app.listen(port);

// export default app;
