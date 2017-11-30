import express from 'express';
import userDetails from '../controllers/userController';
import eventDetails from '../controllers/eventController';
import centerDetails from '../controllers/centerController';
import oauthClass from '../auth/authController';
import validator from '../controllers/validator';

const app = express.Router();

// creating a secure API
app.post('/api/auth/users', oauthClass.authenUser);

// create a new user
app.post('/api/v1/users/signUp', userDetails.signUp);

// creating a new Event
app.post('/api/v1/events/:userId', validator.createEventValidation, eventDetails.create)

// updating event operation
  .put('/api/v1/events/:eventId', eventDetails.updateEvent)

// Deleting an event
  .delete('/api/v1/events/:eventId', eventDetails.deleteAnEvent);

// get all centers
app.get('/api/v1/centers/', centerDetails.getAllCenter);

// creating new center
app.post('/api/v1/centers/:userId', centerDetails.create)

// updates a center's detail
  .put('/api/v1/centers/:centerId', centerDetails.updateACenterDetails)


// Get a center
  .get('/api/v1/centers/:centerId', centerDetails.getACenter);


export default app;
