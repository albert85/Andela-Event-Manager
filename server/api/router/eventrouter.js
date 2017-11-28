// importing express lib
import express from 'express';

// importing eventclas
import eventclassrouter from '../controller/eventclass.js';

// importing router for event and center manager
const eventrouter = express.Router();

eventrouter.route('/')
// create a new event
  .post(eventclassrouter.addNewEvent)
// check if an id to be deleted is supplied
  .delete((req, resp) => {
    resp.json({
      Message: 'Id not supplied',
      Error: true,
    });
  });

eventrouter.route('/:eventid')
  .put(eventclassrouter.editAnEvent)
  .delete(eventclassrouter.deleteAnEvent);

export default eventrouter;
