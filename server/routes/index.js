import userDetails from '../controllers/userController';
import eventDetails from '../controllers/eventController';
import centerDetails from '../controllers/centerController';


export default (app) => {

  // create a new user
  app.post('/api/v1/users/signUp', userDetails.create);

  // creating a new Event
  app.post('/api/v1/events', eventDetails.create);

  // updating event operation
  app.put('/api/v1/events/:eventId', eventDetails.updateEvent);

  // Deleting an event
  app.delete('/api/v1/events/:eventId', eventDetails.deleteAnEvent);

  // creating new center
  app.post('/api/v1/centers/:userId', centerDetails.create);

  // updates a center's detail
  app.put('/api/v1/centers/:centerId', centerDetails.updateACenterDetails);

  // get all centers
  app.get('/api/v1/centers/', centerDetails.getAllCenter);

  // Get a center
  app.get('/api/v1/centers/:centerId', centerDetails.getACenter);


};
