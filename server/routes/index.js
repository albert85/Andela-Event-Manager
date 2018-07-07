import express from 'express';
import userDetails from '../controllers/UserController';
import eventDetails from '../controllers/EventController';
import centerDetails from '../controllers/CenterController';
import validator from '../controllers/Validator';
import loginController from '../controllers/LoginController';
import auth from '../controllers/CheckAuth';

const app = express.Router();

// create a new user
app.post('/api/v1/users/signUp', validator.signUpValidator, userDetails.signUp);

// creating a secure API for login
app.post('/api/v1/user/login', validator.loginValidator, loginController.signIn);

// change user's role (Admin-user or vice versa)
app.put('/api/v1/admin-role/:userId', validator.validateUserChangeRole, auth.checkIfAuthorize, auth.checkIfAuthToManage, userDetails.changeRole);

// get Users email address
app.get('/api/v1/user/email/:userId', loginController.userEmail);

// send email notification
app.post('/api/v1/user/recipientEmail', validator.validateMailData, auth.checkIfAuthorize, loginController.sendEmailNotifications);

// creating a new Event
app.post('/api/v1/events', validator.createEventValidation, auth.checkIfAuthorize, eventDetails.create);

// get all event
app.get('/api/v1/events/:centerId/:page&:limit', validator.validateParams, auth.checkIfAuthorize, eventDetails.getAllEvents);

// get all events for a specific user
app.get('/api/v1/user/events/:centerId/:userIdNo/:page&:limit', auth.checkIfAuthorize, eventDetails.getUserAllEvents);

// updating event operation
app.put('/api/v1/events/:eventId', validator.updateEventValidation, auth.checkIfAuthorize, eventDetails.updateEvent);

// booking or cancelling events
app.put('/api/v1/events/admin/:eventId', auth.checkIfAuthorize, eventDetails.updateAdminEvent);

// get an event
app.get('/api/v1/events/:eventId', auth.checkIfAuthorize, eventDetails.getAnEvent);

// Deleting an event
app.delete('/api/v1/events/:eventId', auth.checkIfAuthorize, eventDetails.deleteAnEvent);

// get all centers
app.get('/api/v1/centers/:page&:limit', validator.validateParams, auth.checkIfAuthorize, centerDetails.getAllCenter);

// search for a center by name and location
app.post('/api/v1/center/search', auth.checkIfAuthorize, centerDetails.searchCenterByNameAndLocation);

// creating new center
app.post('/api/v1/centers', validator.creatCenterValidation, auth.checkIfAuthorize, auth.checkIfAuthToManage, centerDetails.create);

// updates a center's detail
app.put('/api/v1/centers/:centerId', validator.updateCenterValidation, auth.checkIfAuthorize, auth.checkIfAuthToManage, centerDetails.updateACenterDetails);

// Get a center
app.get('/api/v1/centers/:centerId', auth.checkIfAuthorize, centerDetails.getACenter);

// Get a center's event details
app.get('/api/v1/center/:centerId/:page&:limit', auth.checkIfAuthorize, centerDetails.getACenterEventDetails);


export default app;
