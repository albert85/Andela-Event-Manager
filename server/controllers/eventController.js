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
              bookingStatus: req.body.bookingStatus,
              userId: req.body.userId,
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
    // find by id
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

  static deleteAnEvent(req, res) {
    return Event
      .findById(req.params.eventId)
      .then((eventDetails) => {
      // check if the event exist
        if (!eventDetails) {
          return res.status(400).json({ message: 'Event not found' });
        }

        return eventDetails
          .destroy()
          .then(() => { return res.json({ message: 'Successful', eventDetails }); });
      })
      .catch((error) => { return res.status(401).json({ message: 'operation failed', error }); });
  }
}
