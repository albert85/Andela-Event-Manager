const userModel = require('../models').user;
// get users models
// const { user } = allModel;

module.exports = {
  create(req, res) {
    return userModel
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
  },
};
