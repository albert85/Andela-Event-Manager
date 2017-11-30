// importing express and body-parser library
import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

// importing event and center route

import path from 'path';

import routecontroller from './index';

// instantiating express
const app = express();
const swaggerPath = path.join(__dirname, './router/*.js');

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: {
    info: {
      title: 'Event Manager',
      version: '1.0.0',
      description: 'API Documentation of Event Manager',
    },
    host: 'localhost:3000',
    basePath: '/',
  },
  // path to the API docs
  apis: [swaggerPath],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);


// configuring body-parser to json property
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));

// configuring the event and center route
app.use(routecontroller);

// listening to server at port localhost:8090
app.listen(3000, () => {
  console.log('server listening');
});

export default app;
