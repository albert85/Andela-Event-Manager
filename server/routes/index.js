import express from 'express';
import userDetails from '../controllers/userController';
import eventDetails from '../controllers/eventController';
import centerDetails from '../controllers/centerController';
import validator from '../controllers/validator';
import loginController from '../controllers/loginController';
import auth from '../controllers/checkAuth';

const app = express.Router();

// creating a secure API

app.post('/api/v1/user/login', loginController.signIn);

// create a new user
app.post('/api/v1/users/signUp', validator.signUpValidator, userDetails.signUp);

// creating a new Event
app.post('/api/v1/events/', validator.createEventValidation, auth.checkIfAuthorize, eventDetails.create)

// updating event operation
  .put('/api/v1/events/:eventId', auth.checkIfAuthorize, eventDetails.updateEvent)

// Deleting an event
  .delete('/api/v1/events/:eventId', auth.checkIfAuthorize, eventDetails.deleteAnEvent);

// get all centers
app.get('/api/v1/centers/', auth.checkIfAuthorize, auth.checkIfAuthToManage, centerDetails.getAllCenter);

// creating new center
app.post('/api/v1/centers/', auth.checkIfAuthorize, auth.checkIfAuthToManage, centerDetails.create)

// updates a center's detail
  .put('/api/v1/centers/:centerId', auth.checkIfAuthorize, auth.checkIfAuthToManage, centerDetails.updateACenterDetails)


// Get a center
  .get('/api/v1/centers/:centerId', auth.checkIfAuthorize, auth.checkIfAuthToManage, centerDetails.getACenter);


export default app;
