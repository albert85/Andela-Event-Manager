/**
  * @swagger
  * /api/v1/events:
  *   post:
  *     summary: Create a new event
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - Events
  *     parameters:
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - userId
  *             - bookingStatus
  *             - centerId
  *             - eventDate
  *           properties:
  *             name:
  *               type: string
  *             userId:
  *               type: integer
  *             bookingStatus:
  *               type: integer
  *             centerId:
  *               type: integer
  *             eventDate:
  *               type: date
  *           example: {
  *             "name": "Wedding",
  *             "userId": 1,
  *             "bookingStatus": 0,
  *             "centerId": 1,
  *             "eventDate": "2018-01-07"
  *           }
  *     responses:
  *       201:
  *         description: When all the necessary information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *             eventDetails:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 bookingStatus:
  *                   type: integer
  *                 centerId:
  *                   type: integer
  *                 eventDate:
  *                   type: date
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "result": "event sucessfully created",
  *             "eventDetails": {
  *                 "name": "Wedding",
  *                 "userId": 1,
  *                 "bookingStatus": 0,
  *                 "centerId": 1,
  *                 "eventDate": "2018-01-07"
  *
  *             }
  *
  *           }
  *       400:
  *         description: When wrong information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": false,
  *             "result": "The date is not available, please choose another date"
  *           }
  */

/**
  * @swagger
  * /api/v1/events/{centerId}/{page}&{limit}:
  *   get:
  *     summary: Get all events
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - Events
  *     parameters:
  *       - name: centerId
  *         in: path
  *         description: Center's Identification Number
  *         required: true
  *         type: integer
  *         format: int32
  *       - name: page
  *         in: path
  *         description: Number of records to skip
  *         required: true
  *         type: integer
  *         format: int32
  *       - name: limit
  *         in: path
  *         description: max number of records to return at a time
  *         required: true
  *         type: integer
  *         format: int32
  *     responses:
  *       200:
  *         description: When all the necessary information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             totalNumOfEvent:
  *               type: integer
  *             eventDetails:
  *               type: array
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 bookingStatus:
  *                   type: integer
  *                 centerId:
  *                   type: integer
  *                 eventDate:
  *                   type: date
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "totalNumOfEvent": 10,
  *             "eventDetails": [{
  *                 "name": "Wedding",
  *                 "userId": 1,
  *                 "bookingStatus": 0,
  *                 "centerId": 1,
  *                 "eventDate": "2018-01-07"
  *                 }]
  *           }
  *       404:
  *         description: When wrong information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": false,
  *             "result": "Please supply a valid page number. Number of Pages: 0"
  *           }
  */
/**
  * @swagger
  * /api/v1/user/events/{centerId}/{userIdNo}/{page}&{limit}:
  *   get:
  *     summary: Get all events for a specific user
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - Events
  *     parameters:
  *       - name: centerId
  *         in: path
  *         description: Center's Identification Number
  *         required: true
  *         type: integer
  *         format: int32
  *       - name: userIdNo
  *         in: path
  *         description: User's Identification Number
  *         required: true
  *         type: integer
  *         format: int32
  *       - name: page
  *         in: path
  *         description: Number of records to skip
  *         required: true
  *         type: integer
  *         format: int32
  *       - name: limit
  *         in: path
  *         description: max number of records to return
  *         required: true
  *         type: integer
  *         format: int32
  *     responses:
  *       200:
  *         description: When notification is sent and successful
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             totalCount:
  *               type: integer
  *             eventDetails:
  *               type: array
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 bookingStatus:
  *                   type: integer
  *                 centerId:
  *                   type: integer
  *                 eventDate:
  *                   type: date
  *
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "totalCount": 10,
  *             "eventDetails": [{
  *                 "name": "Wedding",
  *                 "userId": 1,
  *                 "bookingStatus": 0,
  *                 "centerId": 1,
  *                 "eventDate": "2018-01-07"
  *                 }]
  *           }
  *       400:
  *         description: When no record is found
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": false,
  *             "result": "No Events Found"
  *           }
  */

/**
  * @swagger
  * /api/v1/events/{eventId}:
  *   put:
  *     summary: Updates event
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - Events
  *     parameters:
  *       - name: eventId
  *         in: path
  *         description: Event's Identification Number
  *         required: true
  *         type: integer
  *         format: int32
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - userId
  *             - centerId
  *             - eventDate
  *           properties:
  *             name:
  *               type: string
  *             userId:
  *               type: integer
  *             centerId:
  *               type: integer
  *             eventDate:
  *               type: date
  *           example: {
  *             "name": "Wedding",
  *             "userId": 1,
  *             "centerId": 1,
  *             "eventDate": "2018-01-07"
  *           }
  *     responses:
  *       200:
  *         description: When all the necessary information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *             eventDetails:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 centerId:
  *                   type: integer
  *                 eventDate:
  *                   type: date
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "result": "sucessfully updated",
  *           }
  *       400:
  *         description: When wrong information are supplied
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": false,
  *             "result": "date not available"
  *           }
  */

/**
  * @swagger
  * /api/v1/events/admin/{eventId}:
  *   put:
  *     summary: Booking or cancelling events
  *     description:
  *       "Required roles: `admin`"
  *     tags:
  *       - Events
  *     parameters:
  *       - name: eventId
  *         in: path
  *         description: ID of the event to be cancelled
  *         required: true
  *         type: integer
  *         format: int32
  *       - name: body
  *         in: body
  *         required: true
  *         schema:
  *           type: object
  *           required:
  *             - name
  *             - userId
  *             - bookingStatus
  *             - centerId
  *             - eventDate
  *           properties:
  *             name:
  *               type: string
  *             userId:
  *               type: integer
  *             bookingStatus:
  *               type: integer
  *             centerId:
  *               type: integer
  *             eventDate:
  *               type: date
  *           example: {
  *             "name": "Wedding",
  *             "userId": 1,
  *             "bookingStatus": 0,
  *             "centerId": 1,
  *             "eventDate": "2018-01-07"
  *           }
  *     responses:
  *       200:
  *         description: When record is available
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *             eventDetail:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 bookingStatus:
  *                   type: integer
  *                 centerId:
  *                   type: integer
  *                 eventDate:
  *                   type: date
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "result": "successfully updated",
  *             "eventDetails": {
  *                 "name": "Wedding",
  *                 "userId": 1,
  *                 "bookingStatus": 0,
  *                 "centerId": 1,
  *                 "eventDate": "2018-01-07"
  *
  *             }
  *           }
  *       401:
  *         description: When record is not found
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": false,
  *             "result": "Error updating"
  *           }
  */

/**
  * @swagger
  * /api/v1/events/{eventId}:
  *   get:
  *     summary: Booking or cancelling events
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - Events
  *     parameters:
  *       - name: eventId
  *         in: path
  *         description: ID of the event to be cancelled
  *         required: true
  *         type: integer
  *         format: int32
  *     responses:
  *       200:
  *         description: When record is available
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 bookingStatus:
  *                   type: integer
  *                 centerId:
  *                   type: integer
  *                 eventDate:
  *                   type: date
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "result": {
  *                 "name": "Wedding",
  *                 "userId": 1,
  *                 "bookingStatus": 0,
  *                 "centerId": 1,
  *                 "eventDate": "2018-01-07"
  *
  *             }
  *           }
  *       404:
  *         description: When record is not found
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": false,
  *             "result": "Event not found!!!"
  *           }
  */


/**
  * @swagger
  * /api/v1/events/{eventId}:
  *   delete:
  *     summary: Deleting events
  *     description:
  *       "Required roles: `user`"
  *     tags:
  *       - Events
  *     parameters:
  *       - name: eventId
  *         in: path
  *         description: ID of the event to be deleted
  *         required: true
  *         type: integer
  *         format: int32
  *     responses:
  *       200:
  *         description: When record is available
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *             eventDetails:
  *               type: object
  *               properties:
  *                 name:
  *                   type: string
  *                 userId:
  *                   type: integer
  *                 bookingStatus:
  *                   type: integer
  *                 centerId:
  *                   type: integer
  *                 eventDate:
  *                   type: date
  *         examples:
  *           application/json: {
  *             "success": true,
  *             "result": Successfully deleted,
  *             "eventDetails": {
  *                 "name": "Wedding",
  *                 "userId": 1,
  *                 "bookingStatus": 0,
  *                 "centerId": 1,
  *                 "eventDate": "2018-01-07"
  *
  *             }
  *           }
  *       404:
  *         description: When record is not found
  *         schema:
  *           type: object
  *           properties:
  *             success:
  *               type: boolean
  *             result:
  *               type: string
  *         examples:
  *           application/json: {
  *             "success": false,
  *             "result": "Event not found!!!"
  *           }
  */

