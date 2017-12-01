// importing express lib
import express from 'express';

// importing eventclas
import eventclassrouter from '../controller/eventClass';

// importing router for event and center manager
const eventrouter = express.Router();

eventrouter.route('/')
/**
  * @swagger
  * /api/v1/events:
  *   post:
  *     summary: Creates a new event
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - Users
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - location
  *             - startTime
  *             - endTime
  *             - date
  *           properties:
  *             name:
  *               type: string
  *             location:
  *               type: string
  *           example: {
  *             "name": "Wedding",
  *             "location": "Ikeja",
  *             "bookingStatus": "booked",
  *             "eventDate": "2017/11/23"
  *           }
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *               type: integer
  *             location:
  *               type: string
*             eventDate:
  *               type: date
  *         examples:
  *           application/json: {
  *             "id": 1,
  *             "name": "Wedding",
  *             "location": "ikeja",
  *             "bookingStatus": "Booked",
  *             "date": "ikeja"
  *           }
  *       400:
  *         description: When incomplete details are supplied
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

/**
  * @swagger
  * /api/v1/events/:event:
  *   put:
  *     summary: Updates an event
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - Users
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - location
  *             - bookingStatus
  *             - date
  *           properties:
  *             name:
  *               type: string
  *             location:
  *               type: string
  *             bookingStatus:
  *               type: string
  *             eventDate:
  *               type: date
  *           example: {
  *             "name": "Wedding",
  *             "location": "Ikeja",
  *             "bookingStatus": "booked",
  *             "eventDate": "2017/11/23"
  *           }
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *               type: integer
  *             location:
  *               type: string
  *             eventDate:
  *               type: date
  *         examples:
  *           application/json: {
  *             "id": 1,
  *             "name": "Wedding",
  *             "location": "ikeja",
  *             "bookingStatus": "Booked",
  *             "date": "ikeja"
  *           }
  *       400:
  *         description: When the event not found
  */

  .put(eventclassrouter.editAnEvent)
/**
  * @swagger
  * /api/v1/events/:event:
  *   delete:
  *     summary: Delete an event
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - Users
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - location
  *             - bookingStatus
  *             - date
  *           properties:
  *             name:
  *               type: string
  *             location:
  *               type: string
  *             bookingStatus:
  *               type: string
  *             eventDate:
  *               type: date
  *           example: {
  *              "message":  "Sucessful deleted",
  *             "name": "Wedding",
  *             "location": "Ikeja",
  *             "bookingStatus": "booked",
  *             "eventDate": "2017/11/23"
  *           }
  *     responses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *               type: integer
  *             location:
  *               type: string
  *             eventDate:
  *               type: date
  *         examples:
  *           application/json: {
  *             "message": "sucessful deleted",
  *             "id": 1,
  *             "name": "Wedding",
  *             "location": "ikeja",
  *             "bookingStatus": "Booked",
  *             "date": "ikeja"
  *           }
  *       400:
  *         description: When the event not found
  */

  .delete(eventclassrouter.deleteAnEvent);

export default eventrouter;
