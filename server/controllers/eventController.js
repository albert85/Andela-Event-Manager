import { Event } from '../models';
// get users models
// const { user } = allModel;

export default class EventControllerClass {
  static create(req, res) {
    // console.log(req.params.userId);
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




};
