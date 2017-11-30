import { Event } from '../models';

export default class EventControllerClass {
  static create(req, res) {
    // check if date is available
    return Event
      .findAll({
        where: {
          eventDate: new Date(req.body.eventDate),
        },
      }).then((dateAvailability) => {
        // console.log(dateAvailability)
        if (dateAvailability.length === 0) {
          return Event
            .create({
              name: req.body.name,
              userId: req.params.userId,
              bookingStatus: req.body.bookingStatus,
              centerId: req.body.centerId,
              eventDate: req.body.eventDate,
            })
            .then((eventDetails) => {
              return res.status(200).json({ newCreate: eventDetails });
            })
            .catch((error) => {
              return res.status(400).json({ message: 'error', error });
            });
        }
        return res.json({ message: 'The date is not available, please choose another' });
      }).catch(() => { return res.json({ message: 'Check your credentials' }); });
  }

  static updateEvent(req, res) {
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
                return res.status(400).send({ message: 'Event not found' });
              }
              // if the event exist update
              return eventDetails
                .update({
                  name: req.body.name || eventDetails.name,
                  bookingStatus: req.body.bookingStatus || eventDetails.bookingStatus,
                  userId: 5 || eventDetails.userId,
                  centerId: req.body.centerId || eventDetails.centerId,
                  eventDate: req.body.eventDate || eventDetails.eventDate,
                }).then(() => { return res.status(200).send(eventDetails); }) // Send back the updated todo.
                .catch((error) => { return res.status(400).send(error); });
            })
            .catch((error) => {
              return res.status(400).send(error);
            });
        }
        // Returns pre-define error meesage if data not available
        return res.json({ message: 'date not available' });
      });
  }

  static deleteAnEvent(req, res) {
    return Event
      .findById(req.params.eventId)
      .then((eventDetails) => {
      // check if the event exist
        if (!eventDetails) {
          return res.status(400).json({ message: 'Event not found' });
        }
        // delete the records
        return eventDetails
          .destroy()
          .then(() => { return res.json({ message: 'Successful', eventDetails }); });
      })
      .catch((error) => { return res.status(401).json({ message: 'operation failed', error }); });
  }
}
