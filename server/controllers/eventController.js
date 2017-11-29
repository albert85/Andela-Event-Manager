import { Event } from '../models';
// get users models
// const { user } = allModel;

export default class EventControllerClass {
  static create(req, res) {
    // check if user logged in
    return Event
      .create({
        name: req.body.name,
        bookingStatus: req.body.bookingStatus,
        userId: 5,
        centerId: req.body.centerId,
        eventDate: req.body.eventDate,
      })
      .then((eventDetails) => {
        return res.status(201).send(eventDetails);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  };

  static updateEvent(req, res) {
    // find by id
    return Event
      .findById(req.params.eventId)
      .then((eventDetails) => {

        // check if the id exists
        console.log(eventDetails);
        if(!eventDetails){
          return res.status(404).send({message: 'Event not found'});
        }
        // if the event exist update
        return eventDetails
        .update({
          name: req.body.name || eventDetails.name,
          bookingStatus: req.body.bookingStatus || eventDetails.bookingStatus,
          userId: 5,
          centerId: req.body.centerId || eventDetails.centerId,
          eventDate: req.body.eventDate || eventDate.eventDate,
        }).then(() => res.status(200).send(eventDetails))  // Send back the updated todo.
        .catch((error) => res.status(400).send(error));

      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  };


};
