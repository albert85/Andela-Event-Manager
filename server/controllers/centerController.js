// import validator from 'validatorjs';
import { Center, Event } from '../models';

export default class CenterControllerClass {
  // Creating a new center
  static create(req, res) {
    // check if center is available on the database
    return Center
      .findAll({
        where: {
          name: req.body.name,
        },
      }).then((centerResult) => {
        // If not available, create and save center details
        if (centerResult.length === 0) {
          return Center
            .create({
              name: req.body.name,
              location: req.body.location,
              capacity: req.body.capacity,
              amount: req.body.amount,
              userId: req.params.userId,
            })
            .then(centerDetail =>
              // Output the result
              res.status(201).send(centerDetail))
            .catch(error => res.status(400).send(error));
        }
        return res.status(400).json({ message: 'Center exists!!!' });
      }).catch(() => res.json({ message: 'Operation failed' }));
  }

  // get A center
  static getACenter(req, res) {
    return Center
      .findById(req.params.centerId)
      .then((centerDetails) => {
        Event
          .findAll({
            where: {
              centerId: req.params.centerId,
            },
          }).then(eventDetail => res.status(200).json({ center: centerDetails, eventDetails: eventDetail }));
      })
      .catch(() => res.status(400).json({ message: 'Center not found!!!' }));
  }

  // get All centers
  static getAllCenter(req, res) {
    return Center
      .findAll()
      .then(centerDetails => res.status(200).json({ message: 'sucessful', centerDetails }))
      .catch(() => res.status(400).json({ message: 'No Center not found!!!' }));
  }

  // Updating a center detail
  static updateACenterDetails(req, res) {
    return Center
      .findById(req.params.centerId)
      .then((centerDetails) => {
        if (!centerDetails) {
          return res.status(400).json({ message: 'Center not found' });
        }

        return centerDetails
          .update({
            name: req.body.name || centerDetails.name,
            location: req.body.location || centerDetails.location,
            capacity: req.body.capacity || centerDetails.capacity,
            amount: req.body.amount || centerDetails.amount,
          })
          .then(() => res.json({ message: 'sucessful', centerDetails }))
          .catch(() => res.json({ message: 'failes to update' }));
      })
      .catch(() => {
        res.status(400).json({ message: 'updates failed' });
      });
  }
}
