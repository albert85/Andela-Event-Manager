import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

import router from './routes';

//  Set up the express
const app = express();
// app.use(cors('*'));

//  Log request to console
app.use(logger('dev'));


// Swagger path
const swaggerPath = path.join(__dirname, './apiDocs/*.js');

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: {
    info: {
      title: 'Event Manager',
      version: '1.0.0',
      description: 'API Documentation of Event Manager',
    },
    host: 'localhost:8000',
    basePath: '/',
  },
  // path to the API docs
  apis: [swaggerPath],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

// import routes into application
app.use(router);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

app.listen(port, () => console.log('Server is runing on port ', port));

export default app;
