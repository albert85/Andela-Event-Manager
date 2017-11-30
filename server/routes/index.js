import userDetails from '../controllers/userController';
import eventDetails from '../controllers/eventController';
import centerDetails from '../controllers/centerController';
import loginAuth from '../controllers/loginController';
import oauthClass from '../auth/authController';
import validator from '../controllers/validator';

export default (app) => {
  // creating a secure API
  app.post('/api/auth/users', oauthClass.authenUser);
  // signin in as authenticated user
  app.post('/api/users/login', validator.loginValidator, loginAuth.signIn);

  // app.use(oauthClass.authenUser);
  // create a new user
  app.post('/api/v1/users/signUp', userDetails.signUp);

  // creating a new Event
  app.post('/api/v1/events/:userId', validator.createEventValidation, eventDetails.create);

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
