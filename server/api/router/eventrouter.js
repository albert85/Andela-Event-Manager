// importing express lib
import express from 'express';

// importing eventclas
import eventclassrouter from '../controller/eventclass';

// importing router for event and center manager
const eventrouter = express.Router();

eventrouter.route('/')
/**
  * @swagger
  * /users:
  *   put:
  *     summary: Creates a new user
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Users
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - username
  *             - password
  *           properties:
  *             username:
  *               type: string
  *             password:
  *               type: password
  *           example: {
  *             "username": "someUser",
  *             "password": "somePassword"
  *           }
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *               type: integer
  *             username:
  *               type: string
  *         examples:
  *           application/json: {
  *             "id": 1,
  *             "username": "someuser"
  *           }
  *       409:
  *         description: When the username is already in use
  */
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
