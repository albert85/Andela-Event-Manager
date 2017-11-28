// importing express and body-parser library
import express from 'express';
import bodyParser from 'body-parser';

// importing event and center route
import routecontroller from './index';

// instantiating express
const app = express();


// configuring body-parser to json property
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configuring the event and center route
app.use(routecontroller);
// app.use('/api/v1/users/events',routecontroller)
// app.use('/api/v1/admin/centers',routecontroller)

// listening to server at port localhost:8090
app.listen(8090, () => {
  console.log('server listening');
});

export default app;
