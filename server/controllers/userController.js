import { user, Event } from '../models';
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
        return res.status(200).send(userDetails);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
  };
/*
  static getUser(req,res){
    return Event
    .findAll()
    .then((userDel) => {
      return res.status(200).send(userDel)
    })
    .catch ((error) => {
      return res.status(400).send(error);
    });
  }
*/


};
