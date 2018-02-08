import jwt from 'jsonwebtoken';
import { Event } from '../models';

export default class EventControllerClass {
  static create(req, res) {
    // get the id of the user
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.status(401).json({ message: 'Token expired' });
    }
    // check if date is available
    return Event
      .findAll({
        where: {
          eventDate: new Date(req.body.eventDate),
          centerId: req.body.centerId,
        },
      }).then((dateAvailability) => {
        // console.log(dateAvailability)
        if (dateAvailability.length === 0) {
          return Event
            .create({
              name: req.body.name,
              userId: decoded.id,
              bookingStatus: req.body.bookingStatus,
              centerId: req.body.centerId,
              eventDate: req.body.eventDate,
            })
            .then(eventDetails => res.status(201).json({ message: 'sucessfully created', eventDetails }))
            .catch(error => res.status(404).json({ message: 'location does not exist', error }));
        }
        return res.status(400).json({ message: 'The date is not available, please choose another' });
      }).catch(() => res.status(400).json({ message: 'Check your credentials' }));
  }

  // get An event
  static getAnEvent(req, res) {
    // get the id of the user
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.json({ message: 'Token expired' });
    }
    return Event
      .findById(req.params.eventId)
      .then((eventDetails) => {
        if (!eventDetails) {
          res.status(404).json({ message: 'Event not found!!!' });
        }
        res.status(200).json({ event: eventDetails });
      })
      .catch(() => res.status(404).json({ message: 'Event not found!!!' }));
  }

  // get All events
  static getAllEvents(req, res) {
    // get the id of the user
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.status(403).json({ message: 'Token expired' });
    }

    return Event
      .findAll()
      .then(eventDetails => res.status(200).json({ message: 'sucessful', eventDetails }))
      .catch(() => res.status(404).json('No Events Found'));
  }

  // get All events for a specific user
  static getUserAllEvents(req, res) {
    // get the id of the user
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.status(403).json({ message: 'Token expired' });
    }

    return Event
      .findAll({
        where: {
          userId: req.params.userIdNo,
        },
      })
      .then(eventDetails => res.status(200).json({ message: 'sucessful', eventDetails }))
      .catch(() => res.status(404).json('No Events Found'));
  }

  static updateEvent(req, res) {
    // get the id of the user
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.status(403).json({ message: 'Token expired' });
    }
    // check if date is available
    return Event
      .findAll({
        where: {
          eventDate: new Date(req.body.eventDate),
        },
      }).then((checkAvailability) => {
        // if data is available, update records
        if (checkAvailability.length === 0) {
          // if the record to be updated
          return Event
            .findById(req.params.eventId)
            .then((eventDetails) => {
              // check if the id exists
              if (!eventDetails) {
                return res.status(404).send({ message: 'Event not found' });
              }
              // if the event exist update
              return eventDetails
                .update({
                  name: req.body.name || eventDetails.name,
                  bookingStatus: req.body.bookingStatus || eventDetails.bookingStatus,
                  userId: req.body.userId || eventDetails.userId,
                  centerId: req.body.centerId || eventDetails.centerId,
                  eventDate: req.body.eventDate || eventDetails.eventDate,
                }).then(() => res.status(200).send({ message: 'sucessfully updated', eventDetails }));
            })
            .catch(() => res.status(400).json('Bad request'));
        }
        // Returns pre-define error meesage if data not available
        return res.status(401).json({ message: 'date not available' });
      })
      .catch(() => res.status(400));
  }

  static updateAdminEvent(req, res) {
    // get the id of the user
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.status(403).json({ message: 'Token expired' });
    }
    // check if date is available
    return Event
      .findAll({
        where: {
          eventDate: new Date(req.body.eventDate),
        },
      }).then((checkAvailability) => {
        // if data is available, update records
        if (checkAvailability.length !== 0) {
          // if the record to be updated
          return Event
            .findById(req.params.eventId)
            .then((eventDetails) => {
              // check if the id exists
              if (!eventDetails) {
                return res.status(404).send({ message: 'Event not found' });
              }
              // if the event exist update
              return eventDetails
                .update({
                  name: req.body.name || eventDetails.name,
                  bookingStatus: req.body.bookingStatus,
                  userId: req.body.userId || eventDetails.userId,
                  centerId: req.body.centerId || eventDetails.centerId,
                  eventDate: req.body.eventDate || eventDetails.eventDate,
                }).then(eventDetail => res.status(200).send({ message: 'successfully updated', eventDetail }));
            })
            .catch(() => res.status(400).json('Bad request'));
        }
        // Returns pre-define error meesage if data not available
        return res.status(401).json({ message: 'Error updating' });
      })
      .catch(() => res.status(400));
  }

  static deleteAnEvent(req, res) {
    return Event
      .findById(req.params.eventId)
      .then((eventDetails) => {
        // check if the event exist
        if (!eventDetails) {
          return res.status(404).json({ message: 'Event not found' });
        }
        // delete the records
        return eventDetails
          .destroy()
          .then(() => res.status(200).json({ message: 'Successful', eventDetails }));
      })
      .catch(error => res.status(401).json({ message: 'operation failed', error }));
  }
}
