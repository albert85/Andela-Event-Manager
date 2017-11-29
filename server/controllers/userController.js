import { user } from '../models';
// get users models
// const { user } = allModel;

export default class UserControllerClass {
  static create(req, res) {
    return user
      .create({
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
        lastName: req.body.lastName,
      })
      .then((userDetails) => {
        return res.status(201).send(userDetails);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  };



};
