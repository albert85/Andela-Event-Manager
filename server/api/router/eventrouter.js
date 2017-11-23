// importing express lib
import express from 'express'

import eventDatabase from '../model/database.js';

// importing eventclas
import eventclassrouter from '../controller/eventclass.js'

// importing router for event and center manager
const eventrouter = express.Router();

eventrouter.route('/')
    .get(eventclassrouter.getNewEvent)
// get all events
// eventrouter.route('/')
// // .all()
//     .get(eventclassrouter.getNewEvent)


export default eventrouter;