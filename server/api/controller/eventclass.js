
// import database
import eventDatabase from '../model/database.js';


export default class Eventmanager{

	// Create an event
	static addNewEvent(req, resp){
		if(!req.body.name || !req.body.location|| !req.body.startTime || !req.body.endTime){
			return resp.json({status: "error", 
			message: "Please fill all field"})
		}

		// creating a new event
		const newEvent = {
			id: eventDatabase.user.length,
			name: req.body.name,
			location: req.body.location,
			startTime: req.body.startTime,
			endTime: req.body.endTime
		}
		eventDatabase.user.push(newEvent);
		resp.json({
			message: 'New event was created',
			Error: false,
			return: eventDatabase.user[eventDatabase.user.length]
		})

	}

	// Edit an event with a user id
	static editAnEvent(req,resp){
		// check if the validity of the input
		if (!req.body.name || !req.body.location || !req.body.startTime || !req.body.endTime) {
			return resp.json({
				message: 'Please supply name, location startTime and endTime of the event',
				Error: true
			})
		}
		// Update the event using event id
		for (let val of eventDatabase.user){
			if (val.id === parseInt(req.params.eventid, 10)) {
				eventDatabase.user[req.params.eventid].name = req.body.name;
				eventDatabase.user[req.params.eventid].location = req.body.location;
				eventDatabase.user[req.params.eventid].startTime = req.body.startTime;
				eventDatabase.user[req.params.eventid].endTime = req.body.endTime;

				return resp.json({
					Message: `User ${val.id} updated`,
					error: false,
					user: eventDatabase.user[req.params.eventid]

				})
			}
		}

		return resp.status(404).json({
			status: 'User not found',
			error: true
		})
	}
// delete an event
	static deleteAnEvent(req, resp){
		for (let val of eventDatabase.user){
			if (val.id === parseInt(req.params.eventid, 10)) {
				eventDatabase.user.splice(val.id, 1);

				return resp.json({
					Message: `User deleted`,
					Error: false,
					return: val
				})
			}
		}

		return resp.json({
			Message: 'User id not found',
			Error: true
		})

	}




}