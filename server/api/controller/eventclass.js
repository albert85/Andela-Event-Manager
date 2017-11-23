// importing express lib
import express from 'express';

// import database
import eventDatabase from '../model/database.js';


export class Eventmanager{

	getNewEvent(req, resp){

		return resp.json({ users: eventDatabase });
	}

}