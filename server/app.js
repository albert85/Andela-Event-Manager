import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import router from './routes';


//  Set up the express
const app = express();

//  Log request to console
app.use(logger('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());


// import routes into application
app.use(router);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port, ()=> console.log('Server is runing on port ', port));

export default app;
