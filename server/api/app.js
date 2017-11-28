// importing express and body-parser library
import express from 'express';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

// importing event and center route
import routecontroller from './index';

// instantiating express
const app = express();


// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: {
    info: {
      title: 'Node Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:9100',
    basePath: '/',
  },
  // path to the API docs
  apis: ['./controller/*.js']
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

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(options));
// configuring the event and center route
app.use(routecontroller);

// listening to server at port localhost:8090
app.listen(9100, () => {
  console.log('server listening');
});

export default app;
