import express from 'express';
import eventDetails from '../controllers/EventController';
import validator from '../controllers/Validator';
import auth from '../controllers/CheckAuth';

const app = express.Router();

// creating a new Event
app.post('/events', validator.createEventValidation, auth.checkIfAuthorize, eventDetails.create);

// get all event
app.get('/events/:centerId/:page&:limit', validator.validateParams, auth.checkIfAuthorize, eventDetails.getAllEvents);

// get all events for a specific user
app.get('/user/events/:centerId/:userIdNo/:page&:limit', validator.validateParamsUserEvent, auth.checkIfAuthorize, eventDetails.getUserAllEvents);

// updating event operation
app.put('/events/:eventId', validator.updateEventValidation, auth.checkIfAuthorize, eventDetails.updateEvent);

// cancelling events
app.put('/events/admin/:eventId', validator.validateParamsEventId, auth.checkIfAuthorize, eventDetails.updateAdminEvent);

// get an event
app.get('/events/:eventId', validator.validateParamsEventId, auth.checkIfAuthorize, eventDetails.getAnEvent);

// Deleting an event
app.delete('/events/:eventId', validator.validateParamsEventId, auth.checkIfAuthorize, eventDetails.deleteAnEvent);


export default app;
