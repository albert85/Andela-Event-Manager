
// import database
import eventDatabase from '../model/database.js';


export default class Eventmanager {

<<<<<<< Updated upstream
	/**
  * @swagger
  * /api/v1/events:
  *   post:
  *     summary: Creates a new user
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
  *                 type: string
  *             startTime:
  *               type: string
  *             endTime:
  *                 type: string
  *             date:
  *               type: date
  *           example: {
  *             "name": "someUser",
  *             "location": "somePassword",
  *             "startTime": "someTime",
  *             "endTime": "someTime",
  *             "date": "someDate",
  *           }
  *     resonses:
  *       200:
  *         schema:
  *           type: object
  *           properties:
  *             id:
  *               type: integer
  *             name:
  *               type: string
  *             location:
  *                 type: string
  *             startTime:
  *               type: string
  *             endTime:
  *                 type: string
  *             date:
  *               type: date
  *         examples:
  *           application/json: {
  *             "id": 1,
  *             "username": "someuser"
  *           }
  *       409:
  *         description: When the username is already in use
	*/

	// Create an event
	static addNewEvent(req, res) {
		if (!req.body.name || !req.body.location || !req.body.startTime || !req.body.endTime) {
			return res.json({
				status: "error",
				message: "Please fill all field"
			})
		}

		// creating a new event
		const newEvent = {
			id: eventDatabase.events.length,
			name: req.body.name,
			location: req.body.location,
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			eventDate: req.body.eventDate
		}
		eventDatabase.events.push(newEvent);

		res.json({
			message: 'New event was created',
			Error: false,
			output: eventDatabase.events[eventDatabase.events.length - 1]
		})

	}

	// Edit an event with a user id
	static editAnEvent(req, res) {
		// check if the validity of the input
		if (!req.body.name || !req.body.location || !req.body.startTime || !req.body.endTime) {
			return res.json({
				message: 'Please supply name, location startTime and endTime of the event',
				Error: true
			})
		}
		// Update the event using event id
		for (let val of eventDatabase.events) {
			if (val.id === parseInt(req.params.eventid, 10)) {
				eventDatabase.events[req.params.eventid].name = req.body.name;
				eventDatabase.events[req.params.eventid].location = req.body.location;
				eventDatabase.events[req.params.eventid].startTime = req.body.startTime;
				eventDatabase.events[req.params.eventid].endTime = req.body.endTime;
				eventDatabase.events[req.params.eventid].eventDate = req.body.eventDate;
				return res.status(200).json({
					Message: `User ${val.id} updated`,
					error: false,
					events: eventDatabase.events[req.params.eventid]

				})
			}
		}

		return res.status(409).json({
			status: 'User not found',
			error: true
		})
	}
	// delete an event
	static deleteAnEvent(req, res) {
		for (let val of eventDatabase.events) {
			if (val.id === parseInt(req.params.eventid, 10)) {
				eventDatabase.events.splice(val.id, 1);

				return res.status(200).json({
					Message: `User deleted`,
					Error: false,
					deleteOutput: val
				})
			}
		}

		return res.status(409).json({
			Message: 'User id not found',
			Error: true
		})

	}




=======
  static addNewEvent(req, res) {
    if (!req.body.name || !req.body.location || !req.body.startTime || !req.body.endTime) {
      return res.json({
        status: 'error',
        message: 'Please fill all field',
      });
    }


    // creating a new event
    const newEvent = {
      id: eventDatabase.events.length,
      name: req.body.name,
      location: req.body.location,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      eventDate: req.body.eventDate,
    };
    eventDatabase.events.push(newEvent);

    res.json({
      message: 'New event was created',
      Error: false,
      output: eventDatabase.events[eventDatabase.events.length - 1],
    });
  }


  // Edit an event with a user id
  static editAnEvent(req, res) {
    // check if the validity of the input
    if (!req.body.name || !req.body.location || !req.body.startTime || !req.body.endTime) {
      return res.json({
        message: 'Please supply name, location startTime and endTime of the event',
        Error: true,
      });
    }
    // Update the event using event id
    for (const val of eventDatabase.events) {
      if (val.id === parseInt(req.params.eventid, 10)) {
        eventDatabase.events[req.params.eventid].name = req.body.name;
        eventDatabase.events[req.params.eventid].location = req.body.location;
        eventDatabase.events[req.params.eventid].startTime = req.body.startTime;
        eventDatabase.events[req.params.eventid].endTime = req.body.endTime;
        eventDatabase.events[req.params.eventid].eventDate = req.body.eventDate;
        return res.status(200).json({
          Message: `User ${val.id} updated`,
          error: false,
          events: eventDatabase.events[req.params.eventid],

        });
      }
    }

    return res.status(409).json({
      status: 'User not found',
      error: true,
    });
  }

  // delete an event
  static deleteAnEvent(req, res) {
    for (const val of eventDatabase.events) {
      if (val.id === parseInt(req.params.eventid, 10)) {
        eventDatabase.events.splice(val.id, 1);

        return res.status(200).json({
          Message: 'User deleted',
          Error: false,
          deleteOutput: val,
        });
      }
    }

    return res.status(409).json({
      Message: 'User id not found',
      Error: true,
    });
  }
>>>>>>> Stashed changes
}
