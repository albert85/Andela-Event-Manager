
// import database
import eventDatabase from '../model/database.js';


export default class Eventmanager{

	// get all events
	static getAllEvent(req, resp){
		
		return resp.json({ result: eventDatabase, message: "success", error: false });
	}

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
			Error: false
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
		for (x of eventDatabase.user) {
			if (x.id === parseInt(req.params.eventid, 10)) {
				eventDatabase.user[req.params.eventid].name = req.body.name;
				eventDatabase.user[req.params.eventid].location = req.body.location;
				eventDatabase.user[req.params.eventid].startTime = req.body.startTime;
				eventDatabase.user[req.params.eventid].endTime = req.body.endTime;

				return resp.json({
					Message: `User ${x.id} updated`,
					error: false,
					user: eventDatabase.user[eventid]

				})
			}
		}

		return resp.status(404).json({
			status: 'User not found',
			error: true
		})
	}

	static deleteAnEvent(req, resp){
		for (val of eventDatabase.user){
			if (val.id === parseInt(req.params.eventid, 10)) {
				events.splice(val.id, 1);

				//Updating the id in the database
				let count = 0;
				for (val of eventDatabase.user) {
					events[count].id = count;
					count++;
				}
				return resp.json({
					Message: `User deleted`,
					Error: false
				})
			}
		}

		return resp.json({
			Message: 'User id not found',
			Error: true
		})

	}


}