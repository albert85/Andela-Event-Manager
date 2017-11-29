import userDetails from '../controllers/userController';
import eventDetails from '../controllers/eventController';
import centerDetails from '../controllers/centerController';


export default (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).send({
      message: 'api working',
    });
  });

  // create a new user
  app.post('/api/v1/users/signUp', userDetails.create);

  // creating a new Event
  app.post('/api/v1/events', eventDetails.create);
  // creating get An event operation
  app.put('/api/v1/events/:eventId', eventDetails.updateEvent);

  // creating new center
  app.post('/api/v1/:userId/centers', centerDetails.create);
};
