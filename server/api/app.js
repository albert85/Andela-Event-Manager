// importing express and body-parser library
import express from 'express';
import bodyParser from 'body-parser';

// importing event and center route
<<<<<<< Updated upstream
=======
import path from 'path';
>>>>>>> Stashed changes
import routecontroller from './index';

// instantiating express
const app = express();
const swaggerPath = path.join(__dirname, './router/*.js');

<<<<<<< Updated upstream
=======
// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: {
    info: {
      title: 'Node Swagger API',
      version: '1.0.0',
      description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:3000',
    basePath: '/',
  },
  // path to the API docs
  apis: [swaggerPath]
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

>>>>>>> Stashed changes
// configuring body-parser to json property
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

<<<<<<< Updated upstream
=======
// serve swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));
>>>>>>> Stashed changes
// configuring the event and center route
app.use(routecontroller);
// app.use('/api/v1/users/events',routecontroller)
// app.use('/api/v1/admin/centers',routecontroller)

// listening to server at port localhost:8090
app.listen(3000, () => {
  console.log('server listening');
});

export default app;
