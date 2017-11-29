// import validator from 'validatorjs';
import { Center } from '../models';

export default class CenterControllerClass {
  static create(req, res) {
    return Center
      .create({
        name: req.body.name,
        location: req.body.location,
        capacity: req.body.capacity,
        amount: req.body.amount,
        userId: req.params.userId,
      })
      .then((centerDetail) => {
        return res.status(201).send(centerDetail);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  }

  // get A center
  static getACenter(req, res) {
    return Center
      .findById(req.params.centerId)
      .then((centerDetails) => { return res.status(200).json({ message: 'sucessful', centerDetails }); })
      .catch(() => { return res.status(400).json({ message: 'Center not found!!!' }); });
  }

  // get All centers
  static getAllCenter(req, res) {
    return Center
      .findAll()
      .then((centerDetails) => { return res.status(200).json({ message: 'sucessful', centerDetails }); })
      .catch(() => { return res.status(400).json({ message: 'No Center not found!!!' }); });
  }

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
          .then(() => { return res.json({ message: 'sucessful', centerDetails }); })
          .catch(() => { return res.json({ message: 'failes to update' }); });
      })
      .catch(() => {
        res.status(400).json({ message: 'updates failed' });
      });
  }
}
