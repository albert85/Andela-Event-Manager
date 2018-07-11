import bcrypt from 'bcrypt';

import db from '../models/index';

export default class UserController {
  /**
   * @description This endpoint can be used to sign up a new user
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static signUp(req, res) {
    // check if email exist
    // console.log(db.user);
    return db.user.findAll({
      where: {
        email: req.body.email,
      },
    }).then((result) => {
      if (result.length !== 0) {
        return res.status(400).send({ success: false, result: 'Credential exist, login into the account or use another email address' });
      }

      // Setting up password for hash
      const saltRound = 10;
      const { password } = req.body;

      // check the email to know if an admin is signing up


      return bcrypt.hash(password, saltRound, (err, hash) => db.user
        .create({
          firstName: req.body.firstName,
          email: req.body.email,
          password: hash,
          isAdmin: (req.body.email === 'admin@role.com'),
          lastName: req.body.lastName,
        })
        .then((userDetails) => {
          const { firstName, lastName, email } = userDetails;
          return res.status(201).send({
            success: true, result: 'sucessful', firstName, lastName, email,
          });
        })
        .catch(() => res.status(400).send({ success: false, result: 'Resource not Created' })));
    }).catch(err => res.status(400).send({ success: false, result: 'Resource not Found', error: err }));
  }


  /**
   * @description This endpoint can be used to change role from user to admin and vice versa
   * @param {object} req
   * @param {object} res
   * @returns {object}
   */
  static changeRole(req, res) {
    // find user by Id
    return db.user
      .findById(req.params.userId)
      .then((userDetails) => {
        if (!userDetails) {
          return res.status(404).send({ success: false, result: 'User not found' });
        }

        // if found, update the user's details
        return userDetails
          .update({
            firstName: req.body.firstName || userDetails.firstName,
            email: req.body.email || userDetails.email,
            password: userDetails.password,
            isAdmin: req.body.isAdmin || userDetails.isAdmin,
            lastName: req.body.lastName || userDetails.lastName,
          }).then(() => {
            // display success message
            return res.status(200).json({ success: true, result: `${userDetails.firstName}'s role has updated as ${userDetails.isAdmin ? 'an Admin' : ' a user'}`, role: userDetails.isAdmin ? 'Admin' : 'User' });
          }).catch(() => res.status(400).json({ success: false, result: 'Please check your details' }));
      }).catch(() => {
        res.status(400).json({ success: false, result: 'Operation failed' });
      });
  }
}
