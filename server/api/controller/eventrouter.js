// importing express lib
import express from 'express'

// importing eventclas
import eventclassrouter from './eventclass.js'

// importing router for event and center manager
const eventrouter = express.Router();

// get all events
eventrouter.get('/', eventclassrouter.getNewEvent());

export default eventrouter;