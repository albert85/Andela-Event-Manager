import express from 'express';
import userDetails from '../controllers/userController';
import eventDetails from '../controllers/eventController';
import centerDetails from '../controllers/centerController';
import validator from '../controllers/validator';
import loginController from '../controllers/loginController';
import auth from '../controllers/checkAuth';

const app = express.Router();

// create a new user
app.post('/api/v1/users/signUp', validator.signUpValidator, userDetails.signUp);

// creating a secure API
app.post('/api/v1/user/login', loginController.signIn);

// creating a new Event
app.post('/api/v1/events', validator.createEventValidation, auth.checkIfAuthorize, eventDetails.create);

// get all event
app.get('/api/v1/events', auth.checkIfAuthorize, eventDetails.getAllEvents);

// updating event operation
app.put('/api/v1/events/:eventId', auth.checkIfAuthorize, eventDetails.updateEvent);

// get an event
app.get('/api/v1/events/:eventId', auth.checkIfAuthorize, eventDetails.getAnEvent);


// Deleting an event
app.delete('/api/v1/events/:eventId', auth.checkIfAuthorize, eventDetails.deleteAnEvent);

// get all centers
app.get('/api/v1/centers', auth.checkIfAuthorize, auth.checkIfAuthToManage, centerDetails.getAllCenter);

// creating new center
app.post('/api/v1/centers', auth.checkIfAuthorize, auth.checkIfAuthToManage, centerDetails.create);

// updates a center's detail
app.put('/api/v1/centers/:centerId', auth.checkIfAuthorize, auth.checkIfAuthToManage, centerDetails.updateACenterDetails);


// Get a center
app.get('/api/v1/centers/:centerId', auth.checkIfAuthorize, auth.checkIfAuthToManage, centerDetails.getACenter);


export default app;
