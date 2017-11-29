import { Center } from '../models';
// get users models
// const { user } = allModel;

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
  };



};
