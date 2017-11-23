// importing express lib
import express from 'express';

// import database
import eventDatabase from '../model/database.js';


export default class Eventmanager{

	
	static getNewEvent(req, resp){
		
		return resp.json({ users: eventDatabase });
	}

	// check for the validity of the parameter supplied
	static checkValidity(req, resp, next){
		// if()
	}

}