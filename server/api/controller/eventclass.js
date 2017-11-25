
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
			id: eventDatabase.events.length,
			name: req.body.name,
			location: req.body.location,
			startTime: req.body.startTime,
			endTime: req.body.endTime
		}
		eventDatabase.events.push(newEvent);
		resp.json({
			message: 'New event was created',
			Error: false,
			output: eventDatabase.events[eventDatabase.events.length-1]
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
		for (let val of eventDatabase.events){
			if (val.id === parseInt(req.params.eventid, 10)) {
				eventDatabase.events[req.params.eventid].name = req.body.name;
				eventDatabase.events[req.params.eventid].location = req.body.location;
				eventDatabase.events[req.params.eventid].startTime = req.body.startTime;
				eventDatabase.events[req.params.eventid].endTime = req.body.endTime;

				return resp.json({
					Message: `User ${val.id} updated`,
					error: false,
					events: eventDatabase.events[req.params.eventid]

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
		for (let val of eventDatabase.events){
			if (val.id === parseInt(req.params.eventid, 10)) {
				eventDatabase.events.splice(val.id, 1);

				return resp.json({
					Message: `User deleted`,
					Error: false,
					deleteOutput: val
				})
			}
		}

		return resp.json({
			Message: 'User id not found',
			Error: true
		})

	}




}